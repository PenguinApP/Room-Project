import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import moment from 'moment';

const styles = theme => ({
    textField: {
        // marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class RequestGroup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            workEdit: [],


        }
    }

    acceptMember = (value) => {
        var { requestGroupMember, acceptClose } = this.props
        var requestMember = {
            userId: value.userId,
            displayName: value.displayName,
            email: value.email,
            photoURL: value.photoURL,
            workGroupId: value.workGroupId,
            workGroupMemberId: value.workGroupMemberId,
            workRole: 'member',
        }

        requestGroupMember(requestMember)
        acceptClose()

    }

    refuseMember = (value) => {
        var { requestGroupMember, refuseClose } = this.props
        var requestMember = {
            workGroupMemberId: value.workGroupMemberId,
            workRole: 'no group',
            userId: value.userId,
        }
        requestGroupMember(requestMember)
        refuseClose()

    }


    render() {
        const { item, classes, anchorEl, handleMenuClose, openAccept, openRefuse, itemGroup, acceptOpen, acceptClose, refuseOpen, refuseClose } = this.props
        return (
            <div>
                <Menu
                    // id={item.workId}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => acceptOpen()}>ยืนยัน</MenuItem>

                    <MenuItem onClick={() => refuseOpen()}>ลบ</MenuItem>
                </Menu>
                <Dialog
                    open={openAccept}
                    onClose={acceptClose}
                    aria-labelledby="form-dialog-title"
                >

                    <DialogTitle id="form-dialog-title">{"ยืนยันการรับสมาชิกเข้ากลุ่ม"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ต้องการรับสมาชิก {itemGroup.displayName} เข้ากลุ่มหรือไม่
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={acceptClose} color="primary">
                            ยกเลิก
                        </Button>
                        <Button onClick={() => this.acceptMember(itemGroup)} color="primary">
                            ยืนยัน
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openRefuse}
                    onClose={refuseClose}
                    aria-labelledby="form-dialog-title"
                >

                    <DialogTitle id="form-dialog-title">{"ยกเลิกคำขอการเข้ากลุ่ม"}</DialogTitle>
                    < DialogContent >
                        <DialogContentText>
                            ต้องการยกเลิกคำขอเข้ากลุ่มของสมาชิก {itemGroup.displayName} หรือไม่
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={refuseClose} color="primary">
                            ยกเลิก
                        </Button>
                        <Button onClick={() => this.refuseMember(itemGroup)} color="primary">
                            ลบ
                        </Button>
                    </DialogActions>
                </Dialog>


            </div>
        )
    }
}
export default withStyles(styles)(RequestGroup);