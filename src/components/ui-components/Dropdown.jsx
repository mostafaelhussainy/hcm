import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../assets/scss/3-components/ui-components/dropdown.scss';

const data = [{id: 0, label: "Istanbul, TR (AHL)"}, {id: 1, label: "Paris, FR (CDG)"}];

const Dropdown = () => {
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  
  const toggleDropdown = () => setOpen(!isOpen);
  
  return (
    <div className='dropdown'>
      <div className='dropdown-header' onClick={toggleDropdown}>
        Select your destination
        <ExpandMoreIcon className={`${isOpen && "open"}`}/>
      </div>
      <div className={`dropdown-body ${isOpen && 'open'}`}>
        {items.map(item => (
          <div className="dropdown-item" key={item.id}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown