var conf = require('./config.json');

//$('.form-group#environments').append(conf.environments);
var tableInsert="";

tableInsert+='<table class="table-condensed" width="100%">';
tableInsert+='<tr><th>Environment</th><th>Status</th><th>Notes</th></tr>';
for(var i=0; i< conf.environments.length; i++) {
	tableInsert+='<tr><td style="width: 25%"><label description="'+conf.environments[i]+'">'+conf.environments[i]+'</label></td><td style="width: 25%"><div="form-group"><select class="form-control" id="envStatus'+i+'" name="envStatus'+i+'" description="STATUS_FOR_'+conf.environments[i]+'" onchange="validateNotes(this, notes'+i+')" onblur="validateNotes(this, notes'+i+')"><option>Up</option><option>Down</option><option>Warn</option></select></div></td><td style="width: 50%"><div="form-group"><input class="form-control" id="notes'+i+'" name="notes" placeholder="Notes" description="NOTES_FOR_'+conf.environments[i]+'" onchange="validateNotes(envStatus'+i+',this)" onblur="validateNotes(envStatus'+i+',this)"></div></td></tr>';
}
tableInsert+='</table>';
$('#environments').append(tableInsert);

//$('.form-control#summary').val(tableInsert);
