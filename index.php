<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
<head>
        <meta charset="utf-8">
        <title>fact test</title>
        <link rel="icon" type="image/png" href="http://www.iconninja.com/files/824/538/525/electrical-sensor-icon.png"/>
		<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
		<link rel="stylesheet" href="css/fact.css">
		<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		<script src="js/fact.js"></script>
</head>

<body>
<h1>Пользователи</h1>

<button class="ui-button ui-widget ui-corner-all" id="add_user">+ Добавить</button>

<div class="div_hr" style=""><hr/></div>

<p><input type="checkbox" id="show_deleted" /> Показывать удаленных</p>

<div id="users-contain" class="ui-widget">
	<table id="users" class="ui-widget ui-widget-content">
    <thead>
      <tr class="ui-widget-header ">
        <th>имя</th>
        <th>пароль</th>
        <th>email</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody></tbody>
	</table>

	<p class="del_button"><button class="ui-button ui-widget ui-corner-all" id="user_del">Удалить выбранное</button></p>

	<div class="legend_hr" style=""><hr/></div>
	<p class="table_legend">* <span class="email_not_confirmed">неподтвержденный@email</span> | <span class="user_archive">удаленный пользователь</span> | <span class="new_row">добавленный пользователь</span> </p>
</div>

  
  
<div id="new_user" title="Новый пользователь">
  <p class="validateTips">Все поля обязательны.</p>
  <form>
    <fieldset>
  <table>
	<tbody>
      <tr><td class="td_label"><label for="name">Имя</label></td>
		<td class="td_input"><input type="text" name="name" id="name" class="text ui-widget-content ui-corner-all" placeholder="nick_name"/></td>
		<td class="td_flag">&nbsp;</td>
		</tr>

      <tr><td class="td_label"><label for="email">E-mail</label></td>
		<td class="td_input"><input type="text" name="email" id="email" value="" class="text ui-widget-content ui-corner-all" placeholder="mail@company.ru"/></td>
		<td class="td_flag">&nbsp;</td>
		</tr>

      <tr><td class="td_label"><label for="password">Пароль</label></td>
		<td class="td_input"><input type="password" name="password1" id="password1" value="" class="text ui-widget-content ui-corner-all" placeholder="ввести пароль"/></td>
		<td class="td_flag">&nbsp;</td>
		</tr>
      <tr><td class="td_label">&nbsp;</td>
		<td class="td_input"><input type="password" name="password2" id="password2" value="" class="text ui-widget-content ui-corner-all" placeholder="подтвердить пароль"/></td>
		<td id="passwd_check" class="td_flag">&nbsp;</td>
		</tr>
  </tbody>
  </table>
    </fieldset>
  </form>
</div>

</body>
</html>

