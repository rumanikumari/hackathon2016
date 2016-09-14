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
$judgeId=$_POST['JudgeId'];
$teamName=$_POST['TeamName'];
$innovation=$_POST['Innovation'];
$bValue=$_POST['BValue'];
$userExp=$_POST['UserExp'];
$functionality=$_POST['Functionality'];
$comments=$_POST['comments'];
if($judgeId==null || $teamName==null)
{
  echo "INVALID DATA SENT";
}
else
{
    $sql1=" select id from Teams where name='$teamName'";
    $result1=mysqli_query($con,$sql1);
    $row = mysqli_fetch_assoc($result1);
    $teamId=$row['id'];
    $sql="INSERT INTO Judging(innovation,businessValue,userExperience,
      functionality,comments,Judge_id,team_id) VALUES('$innovation','$bValue',
        '$userExp','$functionality','$comments','$judgeId','$teamId')";
    $result=mysqli_query($con,$sql);
    if (!$result)
    {
        echo "1";
        echo "SQLSTATE error: ". mysqli_sqlstate($con);
    }
    else
    {
        $scoreTeamIdByJudgeId=$innovation+$bValue+$userExp+$functionality;
        if($judgeId=="ev72")
        {
            $sql1="UPDATE Teams set scoreByJudge1='$scoreTeamIdByJudgeId' where id='$teamId'";
        }
        elseif ($judgeId=="ev73")
        {
            $sql1="UPDATE Teams set scoreByJudge2='$scoreTeamIdByJudgeId' where id='$teamId'";
        }
        else
        {
            $sql1="UPDATE Teams set scoreByJudge3='$scoreTeamIdByJudgeId' where id='$teamId'";
        }
        $result1=mysqli_query($con,$sql1);
        if (!$result1)
        {
            echo "2";
            echo "SQLSTATE error: ". mysqli_sqlstate($con);
        }
        else
        {
              $response['success']=1;
              $response['response']='submited score';
              $response['u_id']=$judgeId;
              echo json_encode($response);
        }
    }
}

mysqli_close($con);
?>
