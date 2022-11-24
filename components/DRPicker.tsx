import {DateRange} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DRPicker = ({dateState, setDateState}:{dateState: [], setDateState:React.Dispatch<React.SetStateAction<{
  startDate: null;
  endDate: null;
  key: string;
}[]>> }) => {
 
      return (

    <DateRange
      editableDateInputs={true}
      onChange={item => setDateState([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={dateState}
      dateDisplayFormat='MM/dd/yyyy'
    />
    )

}

export default DRPicker