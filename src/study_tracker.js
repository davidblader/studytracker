import React, { Component } from 'react';
import {findDOMNode} from 'react-dom';
import ReactToolTip from 'react-tooltip';
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
    // will need to include additional data
    // for each visit
    var visitClass = "circle " + props.visit.status;
    return (
        <td>
            <div data-tip='React-tooltip' className={visitClass} />
            <ReactToolTip place="top" type="dark" effect="solid">
                <span>Visit Registration: <br/></span>
                <span>Data Entry: due in x days<br/></span>
                <span><i>x/y instruments entered</i></span>
            </ReactToolTip>
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
      <VisitCell key={index} visit={v} />
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
             visitLabels: visitLabels
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

function randomDate() {
    return new Date();
}

// TODO
// Restructure this to include more visit information
// such as due date, number of completed instruments,
// visit label, etc. Should be something like:
// baseJSONObject
// |__> PSCID: 1
// |__> Visits: (array of JSON objects)
// |______> visitLabel:
// |______> visitStatus:
// |______> completedInstruments:
// |______> totalInstruments:
// |______> dueDate:
// |
// ...
// |__> PSCID: n
// ...

var dummyData = [
    {
        "pscid": "JGH0000",
        "visits": [
            {
                "status": "deadline-past-data-entry",
                "dueDate": randomDate(),
                "instrumentsCompleted": 1,
                "totalInstruments": 22,
                "visitLabel": "Initial_Assessment_Screening",
                "cohort": "MCI"
            },
            {
                "status": "no-deadline-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 2,
                "totalInstruments": 22,
                "visitLabel": "Clinical_Assessment",
                "cohort": "SCI"
            },
            {
                "status": "complete-data-entry",
                "dueDate": randomDate(),
                "instrumentsCompleted": 3,
                "totalInstruments": 22,
                "visitLabel": "Neuropsych_Assessment",
                "cohort": "AD"
            }
        ]
    },
    {
        "pscid": "PKD0001",
        "visits": [
            {
                "status": "cancelled-data",
                "dueDate": randomDate(),
                "instrumentsCompleted": 1,
                "totalInstruments": 22,
                "visitLabel": "Initial_Assessment_Screening",
                "cohort": "MCI"
            },
            {
                "status": "deadline-past-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 2,
                "totalInstruments": 22,
                "visitLabel": "Clinical_Assessment",
                "cohort": "SCI"
            },
            {
                "status": "deadline-past-data-entry",
                "dueDate": randomDate(),
                "instrumentsCompleted": 3,
                "totalInstruments": 22,
                "visitLabel": "Neuropsych_Assessment",
                "cohort": "AD"
            }
        ]
    },
    {
        "pscid": "JGH0010",
        "visits": [
            {
                "status": "no-deadline-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 1,
                "totalInstruments": 22,
                "visitLabel": "Initial_Assessment_Screening",
                "cohort": "MCI"
            },
            {
                "status": "deadline-past-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 2,
                "totalInstruments": 22,
                "visitLabel": "Clinical_Assessment",
                "cohort": "SCI"

            },
            {
                "status": "deadline-past-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 3,
                "totalInstruments": 22,
                "visitLabel": "Neuropsych_Assessment",
                "cohort": "AD"
            }
        ]
    },
    {
        "pscid": "PKD0011",
        "visits": [
            {
                "status": "no-deadline-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 1,
                "totalInstruments": 22,
                "visitLabel": "Initial_Assessment_Screening",
                "cohort": "MCI"
            },
            {
                "status": "deadline-approaching-data-entry",
                "dueDate": randomDate(),
                "instrumentsCompleted": 2,
                "totalInstruments": 22,
                "visitLabel": "Clinical_Assessment",
                "cohort": "SCI"
            },
            {
                "status": "deadline-approaching-visit",
                "dueDate": randomDate(),
                "instrumentsCompleted": 3,
                "totalInstruments": 22,
                "visitLabel": "Neuropsych_Assessment",
                "cohort": "AD"
            }
        ]
    }
];

var visitLabels = [
    "Screening",
    "Clinical",
    "Neuropsych"
];

export default StudyTracker;