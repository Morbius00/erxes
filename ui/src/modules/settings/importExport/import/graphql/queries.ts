const importHistoryGetColumns = `
  query importHistoryGetColumns($attachmentName: String) {
    importHistoryGetColumns(attachmentName: $attachmentName)
  }
`;

const importHistoryGetDuplicatedHeaders = `
  query importHistoryGetDuplicatedHeaders($attachmentNames: [String]) {
    importHistoryGetDuplicatedHeaders(attachmentNames: $attachmentNames)
  }
`;

const importHistoryGetTypes = `
  query importHistoryGetTypes {
    importHistoryGetTypes
  }
`;

const importHistoryGetExportablePlugins = `
  query importHistoryGetExportablePlugins {
    importHistoryGetExportablePlugins
  }
`;

const importHistories = `
  query importHistories($type: String, $perPage: Int, $page: Int) {
    importHistories(type: $type, perPage: $perPage, page: $page) {
      list {
         _id
        success
        failed
        total
        updated
        name
        contentTypes
        date
        status
        percentage
        attachments
        removed
        user {
          details {
            fullName
          }
          }
        }
      count 
    }
  }
`;

export default {
  importHistoryGetExportablePlugins,
  importHistoryGetTypes,
  importHistories,
  importHistoryGetColumns,
  importHistoryGetDuplicatedHeaders
};
