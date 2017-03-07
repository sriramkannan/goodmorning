/*Read the contents on the screen*/
var $ = require('jquery');
var fs = require('fs');
var emailUtil = require('./script/emailUtil.js');
var conf = require('./config.json');
var validateForm = require('./script/validateForm.js');

var summaryCount = 1;

function addTextArea() {
    fs.readFile('./template/summary.html', 'utf8', function(err, data) {
        var tempSummCount = ++summaryCount;
        var elas = $('.elastic').append(data.replace(/_X/g, '_' + tempSummCount));
    });
}

var summaryByDCCount = 1;

function addTextAreaByEnv() {
    //var html1 = $('#startOfDayForm').html();
    fs.readFile('./template/by-env.html', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        var tempSummByDCCount = summaryByDCCount++;
        var elas = $('.elastic').append(data.replace(/_X/g, '_' + tempSummByDCCount));
    });
}

var issueTypeDropDownBuilder = "";
for (var i = 0; i < conf.issue_type.length; i++) {
    issueTypeDropDownBuilder += "<option>" + conf.issue_type[i] + "</option>";
}

var envDropDownBuilder = "";
for (var i = 0; i < conf.environments.length; i++) {
    envDropDownBuilder += "<option>" + conf.environments[i] + "</option>";
}

var issuesCount = 1;
function addIssues() {
    //$(".form-control#summary").val("This is a test");
    fs.readFile('template/issues.html', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }



        data = data.replace("<!-- _ISSUE_TYPE_ -->", issueTypeDropDownBuilder);
        data = data.replace("<!-- _ENVIRONMENTS_ -->", envDropDownBuilder);


        var elas = $('.elastic').append(data.replace(/_X/g, '_' + (issuesCount++)));
    });
}

function deleteIssue(issue) {
    $(issue).remove();
}

function handleSubmit() {
    //$('#email').val("sriram.kannan@mezocliq.com");
    var formData = {};
    var elasticData;
    $(".form-control").each(function() {
        if ($(this).attr('description') != undefined)
            formData[$(this).attr('description')] = $(this).val();
    });
    fs.writeFile("./temp.json", JSON.stringify(formData), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

    var emailTemplate = fs.readFileSync('./template/email.html', 'utf8');

    var summaryHtml = "";
    if($('.form-control#summary').val() !="") {
        summaryHtml = '<table style="width: 800px; background-color: #EEEEEE; font: 10pt verdana;"><tr><td>'+$('.form-control#summary').val()+'</td></tr></table>';
        emailTemplate = emailTemplate.replace("<!--Summary-->",summaryHtml);
    }

    //the following code populates the overall environment status on the top of the email
    var envStatus = "";
    for (var i = 0; i < conf.environments.length; i++) {

        var color = formData['STATUS_FOR_' + conf.environments[i]]=="Up" ? "#00FF00" : (formData['STATUS_FOR_' + conf.environments[i]]=="Down" ? "#FF0000": "#FFFF00");

        envStatus += "<tr>";
        envStatus += "<td>" + conf.environments[i] + "</td>";
        envStatus += "<td style=\"background-color: "+color+"\">" + formData['STATUS_FOR_' + conf.environments[i]] + "</td>";
        envStatus += "<td>" + formData['NOTES_FOR_' + conf.environments[i]] + "</td>";
        envStatus += "</tr>";
    }

    var issuesBuilder = "";
    for (var i = 0; i < conf.issue_type.length; i++) {
    	var issuesBuilderTemp = "";
    	var found=false;
    	for(var j= 1; j<=issuesCount; j++) {
    		if(formData['ISSUES_TYPE_'+j] == conf.issue_type[i]) {
    			found = true;
    			issuesBuilderTemp+= "<tr><td width=\"150\">"+formData['ISSUES_ENVIRONMENT_'+j]+"</td><td width=\"150\">"+formData['ISSUES_COMPONENT_'+j]+"</td><td width=\"100\">"+formData['ISSUES_DATE_'+j]+"</td><td width=\"450\">"+formData['ISSUES_NOTE_'+j]+"</td></tr>";
    		}
    	}
    	if(found) {
    		issuesBuilder += fs.readFileSync('./template/issue_email.html', 'utf8').replace("<!-- _ISSUES_ -->", "<tr><th align=\"left\">Environment</th><th align=\"left\">Component/Tenant</th><th align=\"left\">Date</th><th align=\"left\">Notes</th></tr>"+issuesBuilderTemp).replace("<!-- _ISSUE_TYPE_ -->",conf.issue_type[i]);
    	}
    }

    //$(".form-control#summary").val("sdfsdfsdfgfdgdffg");


    emailTemplate = emailTemplate.replace('<!--Environment Status-->', envStatus);
    emailTemplate = emailTemplate.replace('<!-- _ISSUES_ -->', issuesBuilder);

    if(validateForm.validateAll()) {
        //alert("email submission");
        $('.form-control').attr('disabled', true); $('.btn').attr('disabled', true); 
        emailUtil.sendEmail($('[type="email"]').val(), $('[type="password"]').val(), emailTemplate, conf.email_list);
        
    } 
    
}