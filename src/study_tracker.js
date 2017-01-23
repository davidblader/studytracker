import React, { Component } from 'react';
import './study_tracker.css';

function SiteFilter(props) {
    return (
        <td>
            <select>
                <option value="site">Site</option>
            </select>
        </td>
    );
}

function TeamFilter(props) {
    return (
        <td>
            <select>
                <option value="team">Team</option>
            </select>
        </td>
    );
}

function CohortFilter(props) {
    return (
        <td>
            <select>
                <option value="cohort">Cohort</option>
            </select>
        </td>
    );
}

class Filters extends Component {
    // pass sites, teams, and cohort data once available
    render() {
        return(
            <table className="Filters">
                <tbody>
                    <tr>
                        <SiteFilter />
                        <TeamFilter />
                        <CohortFilter />
                    </tr>
                </tbody>
            </table>
        );
    }
}


// Change to class if there is to be more than just
// rendering
function PSCIDCell(props) {
    return (
        <td>{props.pscid}</td>
    );
}

function VisitCell(props) {
    var visitClass = "circle " + props.visitStatus;
    return (
        <td>
            <div className={visitClass}/>
        </td>
    );
}

class StudyTrackerHeader extends Component {
  render() {
    var visitLabelHeaders = this.props.visitLabels.map((vl) =>
      <th key={vl}>{vl}</th>
    );
    return (
      <thead className="StudyTrackerHeader">
      <tr>
          <th></th>
          {visitLabelHeaders}
      </tr>
      </thead>
    );
  }
}

class StudyTrackerRow extends Component {
  render() {
    var visits = this.props.visits.map((v, index) =>
      <VisitCell key={index} visitStatus={v} />
    );
    return(
      <tr className="StudyTrackerRow">
        <PSCIDCell pscid={this.props.pscid}/>
        {visits}
      </tr>
    );
  }
}

class StudyTracker extends Component {
    constructor() {
        super();
        this.state = {
            // Rows should be passed to this class
            // as JSON objects
             rows: dummyData,
             visitLabels: [
                 "Screening",
                 "Clinical",
                 "Neuropsych",
                 "MRI",
                 "Lumbar-Puncture",
                 "Follow-Up",
             ]
        };
    }

    render() {
        var dataRows = this.state.rows.map((row) =>
            <StudyTrackerRow key={row.pscid} pscid={row.pscid} visits={row.visits}/>
        );
        return (
            <div className="StudyTracker">
                <h1>Hello, Study Tracker!</h1>
                <Filters/>
                <table>
                    <StudyTrackerHeader visitLabels={this.state.visitLabels}/>
                    <tbody>
                    {dataRows}
                    </tbody>
                </table>
            </div>
        );
    }
    componentWillMount() {
       // this.getRandomRowData = this.getRowData.bind(this);
       // this.getRandomRowData();
    }
    // Random data generator
    getRandomRowData() {
        var tempData = [
            "PSCID0000",
            "PSCID0001",
            "PSCID0010",
            "PSCID0011",
            "PSCID0100",
            "PSCID0101",
            "PSCID0110",
            "PSCID0111",
            "PSCID1000",
            "PSCID1001",
            "PSCID1010",
            "PSCID1011",
            "PSCID1100",
            "PSCID1101",
            "PSCID1110",
            "PSCID1111",
        ];
        var rows = [];

        for (var i = 0; i < tempData.length; i++) {
            var pscVisits = [];
            var status = [
                "complete-data-entry",
                "deadline-approaching-data-entry",
                "deadline-past-data-entry",
                "complete-visit",
                "deadline-approaching-visit",
                "deadline-past-visit",
                "no-deadline-visit",
                "cancelled-visit",
                "cancelled-data"
            ];
          for (var j = 0; j < this.state.visitLabels.length; j++) {
              pscVisits.push(
                  status[Math.floor((Math.random() * status.length))]
              );
          }
          var row = {
              pscid: tempData[i],
              visits: pscVisits
          };
          rows.push(row);
      }
      this.setState({rows: rows});
  }
}

// TODO
// Restructure this to include more visit information
// such as due date, number of completed instruments,
// visit label, etc.
var dummyData = [
    {
        "pscid": "PSCID0000",
        "visits": [
            "deadline-past-data-entry",
            "no-deadline-visit",
            "complete-data-entry",
            "cancelled-data",
            "cancelled-data",
            "deadline-approaching-visit"
        ]
    },
    {
        "pscid": "PSCID0001",
        "visits": [
            "cancelled-data",
            "deadline-past-visit",
            "deadline-past-data-entry",
            "cancelled-data",
            "no-deadline-visit",
            "deadline-past-data-entry"
        ]
    },
    {
        "pscid": "PSCID0010",
        "visits": [
            "no-deadline-visit",
            "deadline-past-visit",
            "deadline-past-visit",
            "cancelled-visit",
            "cancelled-data",
            "deadline-approaching-visit"
        ]
    },
    {
        "pscid": "PSCID0011",
        "visits": [
            "no-deadline-visit",
            "deadline-approaching-data-entry",
            "deadline-approaching-visit",
            "deadline-approaching-visit",
            "cancelled-data",
            "complete-data-entry"
        ]
    },
    {
        "pscid": "PSCID0100",
        "visits": [
            "no-deadline-visit",
            "cancelled-data",
            "deadline-approaching-data-entry",
            "cancelled-visit",
            "complete-data-entry",
            "complete-data-entry"
        ]
    },
    {
        "pscid": "PSCID0101",
        "visits": [
            "cancelled-visit",
            "deadline-approaching-data-entry",
            "deadline-approaching-data-entry",
            "deadline-approaching-visit",
            "cancelled-data",
            "deadline-past-visit"
        ]
    },
    {
        "pscid": "PSCID0110",
        "visits": [
            "complete-visit",
            "deadline-past-visit",
            "deadline-approaching-data-entry",
            "complete-visit",
            "no-deadline-visit",
            "complete-visit"
        ]
    },
    {
        "pscid": "PSCID0111",
        "visits": [
            "cancelled-data",
            "deadline-past-visit",
            "deadline-approaching-visit",
            "no-deadline-visit",
            "deadline-past-data-entry",
            "deadline-past-visit"
        ]
    },
    {
        "pscid": "PSCID1000",
        "visits": [
            "complete-data-entry",
            "deadline-past-data-entry",
            "cancelled-data",
            "deadline-past-data-entry",
            "cancelled-data",
            "deadline-approaching-data-entry"
        ]
    },
    {
        "pscid": "PSCID1001",
        "visits": [
            "cancelled-visit",
            "cancelled-data",
            "cancelled-data",
            "complete-visit",
            "deadline-approaching-visit",
            "cancelled-visit"
        ]
    },
    {
        "pscid": "PSCID1010",
        "visits": [
            "cancelled-data",
            "deadline-approaching-visit",
            "cancelled-data",
            "deadline-approaching-data-entry",
            "deadline-approaching-visit",
            "deadline-past-data-entry"
        ]
    },
    {
        "pscid": "PSCID1011",
        "visits": [
            "deadline-approaching-visit",
            "no-deadline-visit",
            "no-deadline-visit",
            "deadline-past-data-entry",
            "deadline-past-data-entry",
            "deadline-past-data-entry"
        ]
    },
    {
        "pscid": "PSCID1100",
        "visits": [
            "deadline-past-visit",
            "deadline-approaching-visit",
            "cancelled-visit",
            "deadline-past-data-entry",
            "complete-visit",
            "deadline-past-data-entry"
        ]
    },
    {
        "pscid": "PSCID1101",
        "visits": [
            "deadline-past-visit",
            "complete-data-entry",
            "cancelled-data",
            "complete-data-entry",
            "no-deadline-visit",
            "deadline-approaching-data-entry"
        ]
    },
    {
        "pscid": "PSCID1110",
        "visits": [
            "deadline-approaching-visit",
            "cancelled-visit",
            "complete-data-entry",
            "no-deadline-visit",
            "complete-visit",
            "deadline-past-data-entry"
        ]
    },
    {
        "pscid": "PSCID1111",
        "visits": [
            "complete-visit",
            "complete-visit",
            "complete-visit",
            "no-deadline-visit",
            "deadline-past-data-entry",
            "deadline-approaching-data-entry"
        ]
    }];

export default StudyTracker;