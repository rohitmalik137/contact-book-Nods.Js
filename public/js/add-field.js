var counterTel = 1;
var limitTel = 4;
var counterEmail = 1;
var limitEmail = 4;
function addTelField(divName){
    if (counterTel == limitTel)  {
        alert("You can only add " + counterTel + " contact numbers");
    }else{
       var newdiv = document.createElement('div');
       newdiv.innerHTML = '<input class="input" type="tel" name="tel[]" placeholder="Add another Mobile Number">';
       document.getElementById(divName).appendChild(newdiv);
       counterTel++;
    }
}

function addEmailField(divName){
    if (counterEmail == limitEmail)  {
        alert("You can only add " + counterEmail + " emails");
    }else{
        var newdiv = document.createElement('div');
        newdiv.innerHTML = '<input class="input" type="tel" name="email[]" placeholder="Add another Email" required>';
        document.getElementById(divName).appendChild(newdiv);
        counterEmail++;
    }
}

function delete_extra(id){
    document.getElementById(id).name = 'delete';
    document.getElementById(id).style.display = 'none';
    document.getElementById(id+'1').style.display = 'none';
}