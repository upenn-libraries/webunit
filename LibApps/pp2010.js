/*pennportal script used in penn libraries logo block*/
function openshutw(id) { var contents = document.getElementById("C"+id); var control = document.getElementById("I"+id); if (contents.style.display == "none") {    contents.style.display = "block";    control.src = "http://www.library.upenn.edu/images/common/plusrisw_o.gif"; } else {    contents.style.display = "none";    control.src = "http://www.library.upenn.edu/images/common/plusrisw.gif"; }}

var win = null;
function NewWindow(mypage,myname,w,h,scroll){
LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
settings =
'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable'
win = window.open(mypage,myname,settings)
}

function openMediumWin(URL) {    LibrariesWindow=window.open(URL,"librarieswindow","toolbar=no,width=300,height=600,status=no,scrollbars=yes,resizable=yes,menubar=no,alwaysRaised=yes");
}
