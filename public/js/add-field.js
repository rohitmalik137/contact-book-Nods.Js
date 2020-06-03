var counterTel = 1;
var limitTel = 4;
var counterEmail = 1;
var limitEmail = 4;
function addTelField(divName){
    if (counterTel == limitTel)  {
        alert("You can only add " + counterTel + " contact numbers");
    }else{
       var newdiv = document.createElement('div');
       newdiv.innerHTML = '<input class="input" type="tel" name="tel[]" id="tel" placeholder="Mobile Number" required>';
       document.getElementById(divName).appendChild(newdiv);
       counterTel++;
    }
}

function addEmailField(divName){
    if (counterEmail == limitEmail)  {
        alert("You can only add " + counterEmail + " emails");
    }else{
        var newdiv = document.createElement('div');
        newdiv.innerHTML = '<input class="input" type="tel" name="email[]" id="tel" placeholder="Mobile Number" required>';
        document.getElementById(divName).appendChild(newdiv);
        counterEmail++;
    }
}