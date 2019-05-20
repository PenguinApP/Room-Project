import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TStart from '../Picture/TStart.png';
import TCreateRoom from '../Picture/TCreateRoom.png';
import TCreateRoom2 from '../Picture/TCreateRoom2.png';
import TCreateRoom3 from '../Picture/TCreateRoom3.png';
import TCreateWork from '../Picture/TCreateWork.png';
import TCreateWork2 from '../Picture/TCreateWork2.png';
import TCreateWork3 from '../Picture/TCreateWork3.png';
import TInRoomFirstPage from '../Picture/TInRoomFirstPage.png';
import TInRoomMember from '../Picture/TInRoomMember.png';
import TInRoomWorkPage from '../Picture/TInRoomWorkPage.png';
import TInWorkPage from '../Picture/TInWorkPage.png';
import TInWorkPage2 from '../Picture/TInWorkPage2.png';
import SFirstPage from '../Picture/SFirstPage.png';
import SJoinRoom from '../Picture/SJoinRoom.png';
import SJoinRoom2 from '../Picture/SJoinRoom2.png';
import SJoinRoom3 from '../Picture/SJoinRoom3.png';
import SInRoomFirstPage from '../Picture/SInRoomFirstPage.png';
import SInRoomWorkPage from '../Picture/SInRoomWorkPage.png';
import SInWorkPage from '../Picture/SInWorkPage.png';
import SCreateGroup from '../Picture/SCreateGroup.png';
import SCreateGroup2 from '../Picture/SCreateGroup2.png';
import SCreateGroup3 from '../Picture/SCreateGroup3.png';
import SCreateGroup4 from '../Picture/SCreateGroup4.png';
import SJoinGroup from '../Picture/SJoinGroup.png';
import SJoinGroup2 from '../Picture/SJoinGroup2.png';
import SJoinGroup3 from '../Picture/SJoinGroup3.png';
import SJoinGroup4 from '../Picture/SJoinGroup4.png';
import SAcceptMember from '../Picture/SAcceptMember.png';
import SAcceptMember2 from '../Picture/SAcceptMember.png';
import SAcceptMember3 from '../Picture/SAcceptMember.png';
import SAcceptMember4 from '../Picture/SAcceptMember.png';


const styles = theme => ({
    media: {
        Width: 400,
        height: 600,


    },
    card: {
        Width: 300,
        height: 300,
    },
});


class HelpPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="responsive"
                            className={classes.media}
                            image={TStart}

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Teacher Starter Page
          </Typography>
                            <Typography component="p">
                                หน้าแรกของอาจารย์
          </Typography>
                        </CardContent>
                    </CardActionArea>
                </div>

                <div>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="responsive"
                            className={classes.media}
                            image={TCreateRoom}

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Teacher CreateRoom
            </Typography>
                            <Typography component="p">
                                กดCREATE ROOM เพื่อสร้างห้อง
             </Typography>
                        </CardContent>
                    </CardActionArea>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(HelpPage);