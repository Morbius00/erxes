import { getPageList } from '../../facebook/utils';
import { Accounts, Configs, Integrations } from '../../models';
import { getConfig, getConfigs } from '../../utils';
import { IContext } from '../../connectionResolver';

const integrationQueries = {
  // app.get('/accounts', async (req, res) => {
  async integrationsGetAccounts(_root, { kind }: { kind: string }) {
    if (kind.includes('nylas')) {
      kind = kind.split('-')[1];
    }
    const selector = { kind };

    return Accounts.find(selector);
  },

  // app.get('/integrations', async (req, res) => {
  async integrationsGetIntegrations(_root, { kind }: { kind: string }) {
    return Integrations.find({ kind });
  },

  //  app.get('/integrationDetail', async (req, res) => {
  async integrationsGetIntegrationDetail(
    _root,
    { erxesApiId }: { erxesApiId: string }
  ) {
    // do not expose fields below
    const integration = await Integrations.findOne(
      { erxesApiId },
      {
        nylasToken: 0,
        nylasAccountId: 0,
        nylasBillingState: 0,
        googleAccessToken: 0
      }
    );

    return integration;
  },

  // app.get('/gmail/get-email',
  async integrationsGetGmailEmail(_root, { accountId }: { accountId: string }) {
    const account = await Accounts.findOne({ _id: accountId });

    if (!account) {
      throw new Error('Account not found');
    }

    return account.email;
  },

  // app.get('/configs', async (req, res) => {
  async integrationsGetConfigs(_root, {}) {
    return Configs.find({});
  },

  // app.get('/facebook/get-comments', async (req, res) => {
  async integrationsConversationFbComments(_root, args, { models }: IContext) {
    const { postId, isResolved, commentId, senderId } = args;
    let { limit = 10 } = args;

    const post = await models.FbPosts.getPost({ erxesApiId: postId });

    const query: {
      postId: string;
      isResolved?: boolean;
      parentId?: string;
      senderId?: string;
    } = {
      postId: post.postId
    };

    query.isResolved = isResolved === 'false' ? false : true;

    limit = parseInt(limit, 10);

    if (senderId !== 'undefined') {
      const customer = await models.FbCustomers.findOne({ erxesApiId: senderId });

      if (!customer) {
        return null;
      }
      query.senderId = customer.userId;
    } else {
      query.parentId = commentId !== 'undefined' ? commentId : null;
    }

    const result = await models.FbComments.aggregate([
      {
        $match: query
      },
      {
        $lookup: {
          from: 'customers_facebooks',
          localField: 'senderId',
          foreignField: 'userId',
          as: 'customer'
        }
      },
      {
        $unwind: {
          path: '$customer',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'posts_facebooks',
          localField: 'postId',
          foreignField: 'postId',
          as: 'post'
        }
      },
      {
        $unwind: {
          path: '$post',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'comments_facebooks',
          localField: 'commentId',
          foreignField: 'parentId',
          as: 'replies'
        }
      },
      {
        $addFields: {
          commentCount: { $size: '$replies' },
          'customer.avatar': '$customer.profilePic',
          'customer._id': '$customer.erxesApiId',
          conversationId: '$post.erxesApiId'
        }
      },

      { $sort: { timestamp: -1 } },
      { $limit: limit }
    ]);

    return result.reverse();
  },
  // app.get('/facebook/get-comments-count', async (req, res) => {
  async integrationsConversationFbCommentsCount(_root, args, { models }: IContext) {
    const { postId, isResolved = false } = args;

    const post = await models.FbPosts.getPost({ erxesApiId: postId }, true);

    const commentCount = await models.FbComments.countDocuments({
      postId: post.postId,
      isResolved
    });
    const commentCountWithoutReplies = await models.FbComments.countDocuments({
      postId: post.postId,
      isResolved,
      parentId: null
    });

    return {
      commentCount,
      commentCountWithoutReplies
    };
  },

  // app.get('/twitter/get-account', async (req, res, next) => {
  async integrationsGetTwitterAccount(_root, { accountId }: {accountId: string}) {
    const account = await Accounts.findOne({ _id: accountId });

    if (!account) {
      throw new Error('Account not found');
    }

    return account.uid;
    
  },

  // app.get('/facebook/get-pages', async (req, res, next) => {
  async integrationsGetFbPages(_root, args) {
    const { kind, accountId } = args;

    const account = await Accounts.getAccount({ _id: accountId });

    const accessToken = account.token;

    let pages: any[] = [];

    try {
      pages = await getPageList(accessToken, kind);
    } catch (e) {
      if (!e.message.includes('Application request limit reached')) {
        await Integrations.updateOne(
          { accountId },
          { $set: { healthStatus: 'account-token', error: `${e.message}` } }
        );
      }
    }

    return pages;
  },

  // app.get('/videoCall/usageStatus',
  async integrationsVideoCallUsageStatus(_root) {
    const videoCallType = await getConfig('VIDEO_CALL_TYPE');

    switch (videoCallType) {
      case 'daily': {
        const { DAILY_API_KEY, DAILY_END_POINT } = await getConfigs();

        return Boolean(DAILY_API_KEY && DAILY_END_POINT);
      }

      default: {
        return false;
      }
    }
  },
};

export default integrationQueries;
