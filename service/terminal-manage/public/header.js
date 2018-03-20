var testMenus = ["terminal_manage"];
var testChilds = {
  terminal_manage: [
    'terminal_type_management','terminal_resource_management','terminal_import_history', 'terminal_group_management'
  ],
  terminal_parameter_management:[
    'terminal_parameter_management'
  ],
}

localStorage.setItem('token',JSON.stringify("token"));
localStorage.setItem('terminal_manage',JSON.stringify(['terminal_type_management','terminal_resource_management','terminal_import_history', 'terminal_group_management','terminal_parameter_management']));
localStorage.setItem('user',JSON.stringify('admin'));
localStorage.setItem('headers',JSON.stringify(["terminal_manage","terminal_parameter_management"]));
var headerHtml = '<ul class="ant-menu ant-menu-horizontal ant-menu-dark ant-menu-root">';
for(var i=0;i<testMenus.length;i++){
  var item = testMenus[i];
  headerHtml += '<li class="ant-menu-item" role="menuitem" aria-selected="false"><a href="/#/'+item+'/'+testChilds[item][0]+'" >'+item+'</a>/li>';
};
headerHtml+= '</ul>';
document.getElementById("header").innerHTML=headerHtml;
