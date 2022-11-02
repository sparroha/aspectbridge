<link rel='stylesheet' href='css/nav.css'>
<script src="js/bs-dropdown-hover.js"></script>
<nav class="navbar navbar-inverse cssmenu">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="#">Terra Forge</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li class="active"><a href="index.php?page=Terra Forge Home">Home</a></li>
        <li class="dropdown">
          <a class="dropdown-toggle" data-hover="dropdown" data-toggle="dropdown" href="#">Resources<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Wiki</a></li>
            <li><a href="#">Mimicry Wiki</a></li>
            <li><a href="#">Other Wikis</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a class="dropdown-toggle" data-hover="dropdown" data-toggle="dropdown" href="">Communities<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="index.php?page=Teamspeak">Community Hub</a></li>
            <li><a href="index.php?page=Servers">Game Servers</a></li>
            <li><a href='http://sentinel-gaming.com' target=_blank>Sentinel Gaming</a></li>
            <li><a href='http://sentinel-hosting.com' target=_blank>Sentinel Hosting</a></li>
            <li><a href="../dahara">Dahara</a></li>
          </ul>
        </li>
        <li><a href="index.php?page=Documents">Documents</a></li>
        <li><a href="index.php?page=IRC">IRC</a></li>
        <li><a href="index.php?page=Twitch">Twitch</a></li>
        <li><a href="index.php?page=Contact Us">Contact Us</a></li>
        <?php
	   	if($_SESSION['level']>=3){
	   	?>
	   	<li class="dropdown">
            <a class="dropdown-toggle" data-hover="dropdown" data-toggle="dropdown" href="#">Child Sites<span class="caret"></span></a>
            <ul class="dropdown-menu">
	       		<li><a href='../conman'>Conman</a></li>
	       		<li><a href='../tacnuke'>Tacnuke</a></li>
	       		<li><a href='../rencraft'>Rensik</a></li>
	       		<li><a href='../gigas'>TrapMaster</a></li>
	       		<li><a href='../xen'>Xenriath</a></li>
	       		<li><a href='../yet'>Yetruo</a></li>
	       		<li><a href='../helana'>Helana</a></li>
	       		<li><a href='../andrea'>Andrea</a></li>
      	    </ul>
	   	</li>
	   	<li class="dropdown">
            <a class="dropdown-toggle" data-hover="dropdown" data-toggle="dropdown" href="#">Projects<span class="caret"></span></a>
            <ul class="dropdown-menu">
	       		<li><a href='../game'>Game</a></li>
	       		<li><a href='../flash'>Flash</a></li>
	       		<li><a href='../query'>Banners</a></li>
	      	</ul>
	   	</li>
	   	<?php } ?>
      </ul>
      <ul class="nav navbar-nav navbar-right">
      	<?php include "login/index.php";?>
    	<?php if(!isset($_SESSION['username'])){ ?>
        <!--<li><a href="" onclick="return false;" data-toggle="modal" data-target="#login"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>-->
        <li><a href="" onclick="return false;" data-toggle="modal" data-target="#login"><span class="glyphicon glyphicon-log-in"></span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-user">&nbsp;</span> Login/Register</a></li>
        <?php }else{ ?>
        <li><a href="" onclick="return false;" data-toggle="modal" data-target="#login"><span class="glyphicon glyphicon-log-out"></span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-user">&nbsp;</span> Logout/Update Profile</a></li>
   		<li class='active'><a href='#' onclick="return false;" ><span><?php echo 'Hi '.$_SESSION['username'].' lvl:'.$_SESSION['level'] ?></span></a></li>
   		<?php } ?>
      </ul>
    </div>
  </div>
</nav>