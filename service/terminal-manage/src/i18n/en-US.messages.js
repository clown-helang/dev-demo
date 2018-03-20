const BaseUI = {
  "common.BaseUI.button.add": "Add",
  "common.BaseUI.button.search": "Search",
  "common.BaseUI.button.edit": "Edit",
  "common.BaseUI.button.delete": "Delete",
  "common.BaseUI.table.total": "Total",
  "common.BaseUI.table.result": "items",
  'common.BaseUI.button.details':'details',
  'common.BaseUI.button.issued':'issued',
  "common.BaseUI.button.okText": "Confirm",
  "common.BaseUI.button.cancelText": "Cancel",
  'common.BaseUI.button.preview': 'Preview',
}

const errorResult = {
  //other
  "204": "Success.",
  "error": "Error",
  "commom.Error.nologin.title": "Sorry",
  "commom.Error.nologin.content": "Sorry,your session has expired,please re-login",
  "no.select.rows": "Please select the data to be operated.",
  "common.Error.PageNotFound": "Page Not Found.",
}
const Demo = {
  'common.Demo.demo': 'Intl Demo',
}
export default { ...BaseUI, ...errorResult, ...Demo };
