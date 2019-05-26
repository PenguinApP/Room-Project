import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TStart from '../Picture/TStart.png';
import TCreateRoom from '../Picture/TCreateRoom.PNG';
import TCreateWork from '../Picture/TCreateWork.PNG';
import TEditWork from '../Picture/TEditWork.PNG';
import TCheckMember from '../Picture/TCheckMember.PNG';
import TCopyIdRoom from '../Picture/TCopyIdRoom.PNG';
import SJoinRoom from '../Picture/SJoinRoom.PNG';
import SCreateGroup from '../Picture/SCreateGroup.PNG';
import SJoinGroup from '../Picture/SJoinGroup.PNG';
import SAcceptGroup from '../Picture/SAcceptGroup.PNG';
import SCreateTask from '../Picture/SCreateTask.PNG';
import SSubmitWork from '../Picture/SSubmitWork.PNG';
import TCheckWork from '../Picture/TCheckWork.PNG';
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
                                Teacher Create Room
            </Typography>
                            <Typography component="p">
                                กดCREATE ROOM เพื่อสร้างห้อง
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
                            image={TCreateWork}

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Teacher Create Work
            </Typography>
                            <Typography component="p">
                                กดเครื่องหมายบวกเพื่อสร้างงาน
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
                            image={TEditWork}

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Teacher Edit Work
            </Typography>
                            <Typography component="p">
                                กดเครื่องหมายเพิ่มเติมเพื่อแก้ไขงาน
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
                            image={TCheckMember}

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Teacher Check Member
            </Typography>
                            <Typography component="p">
                                กดคำว่า "สมาชิกในห้อง" เพื่อดูสมาชิกในห้อง
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
                            image={TCopyIdRoom}

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Teacher Copy ID Room
            </Typography>
                            <Typography component="p">
                                กดปุ่ม Copy เพื่อคัดลอกเลขห้อง
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
                            image={SJoinRoom}

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Student Join Room
            </Typography>
                            <Typography component="p">
                                กดปุ่ม JOIN ROOM เพื่อเข้าร่วมห้อง
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
                            image={SCreateGroup}

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Student Create Group
            </Typography>
                            <Typography component="p">
                                กดเครื่องหมายบวกเพื่อสร้างกลุ่ม
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
                            image={SJoinGroup}

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Student Join Group
            </Typography>
                            <Typography component="p">
                                กดรายชื่อกลุ่มเพื่อขอเข้าร่วมกลุ่ม
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
                            image={SAcceptGroup}

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Student Accept Group
            </Typography>
                            <Typography component="p">
                                กดยืนยันเพื่อรับเข้ากลุ่ม
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
                            image={SCreateTask}

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Student Crate Task
            </Typography>
                            <Typography component="p">
                                กดปุ่มเพิ่มงานเพื่อสร้างงานใน Task
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
                            image={SSubmitWork}

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Student Submit Work
            </Typography>
                            <Typography component="p">
                                กดปุ่มส่งงานเพื่อส่งงาน
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
                            image={TCheckWork}

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Teacher Check Work
            </Typography>
                            <Typography component="p">
                                กดปุ่มนักเรียนเพิ่อ Check สถานะส่งงาน
             </Typography>
                        </CardContent>
                    </CardActionArea>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(HelpPage);