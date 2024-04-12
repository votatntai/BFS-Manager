import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButtonProps } from "@mui/material";
import CustomizedSwitches from '../../component/button/CustomizedSwitches';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

// const ExpandMore = styled((props: any) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));
// const Accordion = styled((props: any) => (
//     <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(({ theme }) => ({
//     border: `1px solid ${theme.palette.divider}`,
//     '&:not(:last-child)': {
//         borderBottom: 0,
//     },
//     '&::before': {
//         display: 'none',
//     },
// }));

// const AccordionSummary = styled((props: any) => (
//     <MuiAccordionSummary
//         expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
//         {...props}
//     />
// ))(({ theme }) => ({
//     backgroundColor:
//         theme.palette.mode === 'dark'
//             ? 'rgba(255, 255, 255, .05)'
//             : 'rgba(0, 0, 0, .03)',
//     flexDirection: 'row-reverse',
//     '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
//         transform: 'rotate(90deg)',
//     },
//     '& .MuiAccordionSummary-content': {
//         marginLeft: theme.spacing(1),
//     },
// }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//     padding: theme.spacing(2),
//     borderTop: '1px solid rgba(0, 0, 0, .125)',
// }));
export default function BirdMenuCard(props: any) {
    // const [expanded, setExpanded] = React.useState(false);
    // const { bird } = props
    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // }

    // const [accordionExpend, setAccordionExpend] = React.useState('panel1');

    // const handleChange = (panel) => (event, newExpanded) => {
    //     setAccordionExpend(newExpanded ? panel : false);
    // };
    return (<>
    </>
        // <Card
        //     className="shadow max-w-[345px]"
        // >
        //     <CardHeader
        //         avatar={
        //             (<Avatar src={bird.thumbnailUrl} />)
        //         }
        //         action={
        //             <IconButton >
        //                 <MoreVertIcon />
        //             </IconButton>
        //         }
        //         title={bird.name}
        //         subheader={`${bird?.species.name} - ${bird?.careMode.name}`}
        //     />
        //     {/* <CardContent>
        //     <Typography variant="body2" color="text.secondary">
        //         Bird Info
        //       </Typography>
        //   </CardContent> */}
        //     <CardActions disableSpacing >
        //         <CustomizedSwitches />
        //         <ExpandMore
        //             expand={expanded}
        //             onClick={handleExpandClick}
        //         >
        //             <ExpandMoreIcon />
        //         </ExpandMore>
        //     </CardActions>

        //     <Collapse in={expanded} timeout="auto" unmountOnExit>
        //         <CardContent>
        //             {/* <Accordion expanded={accordionExpend === 'panel1'} onChange={handleChange('panel1')}>
        //                 <AccordionSummary>
        //                     <Typography>Morning </Typography>
        //                 </AccordionSummary>
        //                 <AccordionDetails>
        //                     <Typography>
        //                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        //                         malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
        //                         sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
        //                         sit amet blandit leo lobortis eget.
        //                     </Typography>
        //                 </AccordionDetails>
        //             </Accordion> */}
        //         </CardContent>
        //     </Collapse>
        // </Card >
    )
}
