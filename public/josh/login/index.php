
<?php
session_start();
?>

<!-- Modal -->
<div id="login" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">&times;</button>
			<h3 class="modal-title">Terra Forge Login</h3>
		</div>
		<form id=modalForm action="login/login.php" method="POST">
			<input type=hidden name=returnurl value=<? echo 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'] ?>>
		<div class="modal-body">
			<?if ($_SESSION['status']!='login'){?>
			<div class=row>
				<div class=col-sm-3>
					<p><label>User Name</label>
				</div>
				<div class=col-sm-5>
					<input id="username" type="text" name="username" placeholder="username" /></p>
				</div>
			</div>
			<?}?>
			<div class=row>
				<div class=col-sm-3>
					<p><label>Password</label>
				</div>
				<div class=col-sm-5>
					<input id="password" type="password" name="password" placeholder="password" /></p>
				</div>
			</div>
			<div class=row>
				<div class=col-sm-3>
					<p><label>E-Mail</label>
				</div>
				<div class=col-sm-5>
					<input id="password" type="email" name="email" placeholder="user@email.com" /></p>
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<?if ($_SESSION['status']=='login'){?>
			<input class="btn btn-default" type="submit" name="submit" value="Update" />
			<input class="btn btn-default" type="submit" name="submit" value="Logout" />
			<?}else{?>
			<input class="btn btn-default" type="submit" name="submit" value="Login" />
			<input class="btn btn-default" type="submit" name="submit" value="Register" />
			<?}?>
		</div>
		</form>
    </div>

  </div>
</div>

<!-- Trigger the modal with a button -->

