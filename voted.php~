<?php
include_once "Config.php";
$con=mysqli_connect("localhost","root","root","hackathon2k16");
// Check connection
if (mysqli_connect_errno())
{
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
$vote1=$_POST['TeamOne'];
$vote2=$_POST['TeamTwo'];
$vote3=$_POST['TeamThree'];
$userId=$_POST['userId'];
if($vote1==null || $vote2==null || $vote3==null)
{
  echo "INVALID SUBMISSION (VOTE FOR THREE TEAMS)";
}
else
{
      $sql1="UPDATE Teams SET votes = votes + 1 where name='$vote1'";
      $sql2="UPDATE Teams SET votes = votes + 1 where name='$vote2'";
      $sql3="UPDATE Teams SET votes = votes + 1 where name='$vote3'";
      $sql4="select votes from Users where id='$userId'";
      $result=mysqli_query($con,$sql4);
      $row=mysqli_fetch_assoc($result);
      if($row['votes']!=0)
      {
		      $result1=mysqli_query($con,$sql1);
		      if (!$result1)
		      {
			  echo "vote1";
			  echo "SQLSTATE error: ". mysqli_sqlstate($con);
		      }
		      $result2=mysqli_query($con,$sql2);
		      if (!$result2)
		      {
			  echo "vote2";
			  echo "SQLSTATE error: ". mysqli_sqlstate($con);
		      }
		      $result3=mysqli_query($con,$sql3);
		      if (!$result3)
		      {
			  echo "vote3";
			  echo "SQLSTATE error: ". mysqli_sqlstate($con);
		      }
		      echo "success";
		      $result4=mysqli_query($con,"UPDATE Users SET votes=0 where id='$userId'");
 	}
	else
	{
		      echo "ALREADY VOTED FOR 3 TEAMS";	
	}
}

mysqli_close($con);
?>
