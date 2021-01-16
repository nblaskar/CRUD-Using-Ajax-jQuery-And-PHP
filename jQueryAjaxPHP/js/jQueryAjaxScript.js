$(document).ready(function(){
//Ajax Request for Retrieve Data
function showdata(){
    $.ajax({
        url:"retrieve.php",
        method:"GET",
        dataType:"json",
        success:function(data){
            //response here
            // console.log(data);
            if(data){
                x=data;
            }else{
                x="";
            }
            var output="";
            for(i=0;i<x.length;i++){
                // console.log(x[i]);
                output+="<tr><td>"+x[i].id+"</td><td>"+x[i].name+"</td><td>"+x[i].email+"</td><td>"+x[i].password+"</td><td><button class='btn btn-warning btn-sm m-1 btn-edit'data-sid="+x[i].id +">Edit</button><button class='btn btn-danger btn-sm btn-del m-1' data-sid="+x[i].id +">Delete</button></td><tr>";
            }
            $("#tbody").html(output);
        },
    })
}
showdata();



//Ajax request for Insert Data
//Start insertion
    $("#btnadd").click(function(e){
        e.preventDefault();
        console.log("Save Button Clicked");        
        let stid=$("#stuid").val();
        let nm=$("#nameid").val();
        let em=$("#emailid").val();
        let pw=$("#passwordid").val();

        //data to send
        const mydata={id:stid,name:nm, email:em, password:pw};

        $.ajax({
            url:"insert.php",
            method:"POST",
            data: JSON.stringify(mydata),
            success:function(data){
                //response here
                msg="<div class='alert alert-dark mt-3'>"+data+"</div>";
                $("#msg").html(msg);
                console.log(data);
                $("#myform")[0].reset();
                showdata();
            },
        })
    })
    // End Insertion
    //Ajax Request for Deleting Data
    $("tbody").on("click",".btn-del", function(){
        console.log("Delete Button clicked");
        let id=$(this).attr("data-sid");
        console.log(id);
        const mydata={sid:id};
        mythis=this;
        $.ajax({
            url:"delete.php",
            method:"POST",
            data:JSON.stringify(mydata),
            // success:function(data){
            //     msg="<div class='alert alert-primary mt-3'>"+data+"</div>";
            //     $("#msg").html(msg);
            //     console.log(data);
            //     //showdata();
            // }
            //For fadout
            success:function(data){
                if(data==1){                   
                    msg="<div class='alert alert-primary mt-3'>Student Deleted Successfully!!</div>";
                    $("#msg").html(msg);
                    $(mythis).closest("tr").fadeOut();        

                }else if(data==0){
                    msg="<div class='alert alert-primary mt-3'>Unable to Delete Student</div>";
                    $("#msg").html(msg);   
                }              
            }
        })
    })
    //Ajax Request for Editing Data
    $("tbody").on("click",".btn-edit", function(){
        console.log("Edit Button clicked");
        let id=$(this).attr("data-sid");
        console.log(id);
        const mydata={sid:id};
        $.ajax({
            url:"edit.php",
            method:"POST",
            dataType:"json",
            data:JSON.stringify(mydata),
            success:function(data){                
                console.log(data);
                $("#stuid").val(data.id);
                $("#nameid").val(data.name);
                $("#emailid").val(data.email);
                $("#passwordid").val(data.password);

                
            },
           
        
        });
    });




});