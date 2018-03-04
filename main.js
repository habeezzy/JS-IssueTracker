document.getElementById('issueInputForm').addEventListener('submit', saveIssue);  //handles submit event from form//

function saveIssue(e) {
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById("issueSeverityInput").value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  var issueId = chance.guid();  //chancejs library returns a global unit identifier
  var issueStatus = 'Open';

  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  if(localStorage.getItem('issues') == null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('issueInputForm').reset();  //reset input elements

  fetchIssues();

  e.preventDefault(); //prevent form from submitting
}

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));  //parsing return value from local storage//
  var issuesList = document.getElementById('issuesList'); //reference to the issues list div element//

  issuesList.innerHTML = '';  //generating the dynamic list output//

  for(var i=0;i<issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    issuesList.innerHTML += '<div class="well">' + '</div>'
                            '<h6> Issue ID:' + id + '</h6>' +
                            '<p><span class="label label-info">' + status + '</span></p>' +
                            '<h3>' + desc + '</h3>' +
                            '<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>' +
                            '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
                            '<a href="#" onclick="setStatusClosed(\' '+ id +'\')" class="btn btn-warning">Close</a>' +
                            '<a href="#" onclick="deleteIssue(\' '+ id +'\')" class="btn btn-danger">Delete</a>' +
                            '</div>';
  }
}
