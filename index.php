<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
<head>
        <meta charset="utf-8">
        <title>Rainbow</title>
        <link rel="icon" type="image/png" href="http://www.iconninja.com/files/824/538/525/electrical-sensor-icon.png"/>
		<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
		<link rel="stylesheet" href="css/fact.css">
		<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		<script src="js/fact.js"></script>
</head>

<body>
<h1>Администрирование пользователей</h1>

<p><input type="checkbox" id="flag_del" name="flag_del" /> Показывать удаленных</p>

<div id="users-contain" class="ui-widget">
	<table id="users" class="ui-widget ui-widget-content">
    <thead>
      <tr class="ui-widget-header ">
        <th>имя</th>
        <th>passwd</th>
        <th>email</th>
        <th>выбрать</th>
      </tr>
    </thead>
    <tbody></tbody>
	</table>
</div>

<button id="user-del">удалить</button>
  
</body>
</html>

