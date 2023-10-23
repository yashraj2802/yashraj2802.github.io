var i;
var s= document.getElementById("states");

for(i=0; i<s.options.length;i++)
{
    s.options[i].addEventlistener("click", function(){
        console.log(s.options[i].setAttribute("selected", "true"));
    });
}