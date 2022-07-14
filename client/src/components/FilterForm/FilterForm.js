import React from 'react';
import './FilterForm.css';

function FilterForm() {
  return (
    <div className='filter-container'>
        <form>
            <input type="checkbox" id="innova" name="innova" value="Innova" />
            <label for="innova">Innova</label><br/>
            <input type="checkbox" id="mvp" name="mvp" value="MVP" />
            <label for="mvp">MVP</label><br/>
            <input type="checkbox" id="discraft" name="discraft" value="Discraft" />
            <label for="discraft">Discraft</label>
        </form>
    </div>
  )
}

export default FilterForm