import { Link, useParams } from 'react-router-dom';
import TaskHeader from './TaskHeader';
import TaskTable from './TaskTable';
const Task =()=>{
    const routeParams = useParams();
	const { cageId, cageName } = routeParams;
    return <div className='bg-white'>
    <TaskHeader title={cageName} cageId={cageId}/>
    <TaskTable cageId={cageId}/>
    </div>
}

export default Task