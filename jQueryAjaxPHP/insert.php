<?php

//Make dcConnection
include('dbConnection.php');

//Receive and Access Data
$data=stripslashes(file_get_contents("php://input"));
$mydata=json_decode($data,true);
$id=$mydata['id'];
$name=$mydata['name'];
$email=$mydata['email'];
$password=$mydata['password'];

//Insertion Query
//Only insert data
// if(!empty($name) && !empty($email) && !empty($password)){
//     $sql="INSERT INTO student(name, email, password) VALUES('$name', '$email', '$password')";
//     if($conn->query($sql)== TRUE){
//             echo "Student Save Successfully";
//     } else{
//             echo "Unable to Save Information";
//     }
// } 
// else{
//     echo "Fill All Fields";
// }

//Insert And Update Data
if(!empty($name) && !empty($email) && !empty($password)){
    $sql="INSERT INTO student(id, name, email, password) VALUES('$id','$name', '$email', '$password') ON DUPLICATE KEY UPDATE name='$name',email='$email',password='$password'";
    if($conn->query($sql)== TRUE){
            echo "Student Save Successfully";
    } else{
            echo "Unable to Save Information";
    }
} 
else{
    echo "Fill All Fields";
}


?>