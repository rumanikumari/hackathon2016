<?php
include_once "Config.php";
$con=mysqli_connect("localhost","root","root","hackathon2k16");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
// Perform queries
$response = array();
$index = 0;
$result=mysqli_query($con,"SELECT id, name FROM Teams");
$num=mysqli_num_rows($result);
if( $num== 0){
   $response['success']=0;
   $response['response']='no regsitered teams';
   $response['u_id']='';
   echo json_encode($response);
}

else{
	while($row = mysqli_fetch_assoc($result))
	    {
        $response[$index]['id']=$row['id'];
  			$response[$index]['name']=$row['name'];
  		  $index++;
	    }
	  echo json_encode($response);

    }

mysqli_close($con);
?>
