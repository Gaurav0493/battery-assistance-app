import React from 'react';
import { academyWithIssue } from '../helpers/dailyAverageBatteryConsumption'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';


class Academy extends React.Component {
    state = { academyAtIssueArray: null }

    componentDidMount() {
        let academyAtIssue = academyWithIssue();
        let academyAtIssueArray = Object.entries(academyAtIssue).map((e) => ({ [e[0]]: e[1] }));

        console.log(academyAtIssueArray)
        this.setState({ academyAtIssueArray });

    }
    render() {
        let { academyAtIssueArray } = this.state;
        return (
            <div >
                <GridList style={{ width: '100%',height: '100%'}} cellHeight={180} >
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader style={{textAlign:'center', color:"#464649"}} component="div">Academy that needes battery replacements</ListSubheader>
                    </GridListTile>

                    {academyAtIssueArray && academyAtIssueArray.map((academy, i) => (
                        <GridListTile key={Object.keys(academy)}>
                            <img style={{height:50, width:120}}src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTR3PBNtHcHGqJ8kWkd2-fJU5QEQT_Iga6WsJB2whh27D6D8Xcy'} alt={"school"} />
                            <GridListTileBar style={{color:"#464649"}}
                                title={`AcademyID : ${Object.keys(academy)}`}
                                subtitle={<span>Number of batteries which needs replacement at this academy <span style={{color:"#7cbe30"}} >{academy[Object.keys(academy)]}</span></span>}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        )
    }
}

export default Academy;
