<?php
include_once "Config.php";
$con=mysqli_connect("localhost","root","root","hackathon2k16");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
// Perform queries
$TPX = $_POST['TPX'];
//$name = $_POST['name'];
if($TPX==null)
{
  echo "INVALID INPUT";
}
else 
{
      $sql1 = "select * from Users where id='$TPX'";
      $result = mysqli_query($con,$sql1);
      if (!$result)
      	  {
            echo "1";
      	  echo "SQLSTATE error: ". mysqli_sqlstate($con);
      	  }
      $num=mysqli_num_rows($result);
      if ($num==0){
        echo $num;
      	$sql = "INSERT INTO Users(id) VALUES('$TPX')";
      	if (!mysqli_query($con,$sql)){
      	  echo "SQLSTATE error: ". mysqli_sqlstate($con);
      	  }
          else{
            echo "success";
          }

      }
      else{
      	echo "already exists";
      }
  }
mysqli_close($con);
?>
