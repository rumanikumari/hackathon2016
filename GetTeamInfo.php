<?php
include_once "Config.php";
$con=mysqli_connect("localhost","root","root","hackathon2k16");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
// Perform queries
$TeamName=$_POST["TeamName"];
$response = array();
$index = 0;
if($TeamName==null)
{
  echo "NO TEAM SELECTED";
}
else {
          $result=mysqli_query($con,"SELECT id, name, idea, scoreByJudge1, scoreByJudge2, scoreByJudge3 FROM Teams WHERE name='$TeamName'");
          $num=mysqli_num_rows($result);
          if( $num== 0){
                 $response['success']=0;
                 $response['response']='Invalid Credentials';
                 $response['u_id']='';
                 echo json_encode($response);
          }

          else{
          	     while($row = mysqli_fetch_assoc($result))
              	    {
                      $response[$index]['id']=$row['id'];
                      $response[$index]['name']=$row['name'];
                      $response[$index]['idea']=$row['idea'];
                      $response[$index]['scoreByJudge1']=$row['scoreByJudge1'];
                      $response[$index]['scoreByJudge2']=$row['scoreByJudge2'];
                      $response[$index]['scoreByJudge3']=$row['scoreByJudge3'];
                      $index++;
              	    }
              	  echo json_encode($response);

              }
}


mysqli_close($con);
?>
