/* Import(s) */
import React from 'react';

/* * * * * * * * * * *
 * * Filter component *
 *
 * @description : A button to filter tasks
 *
 * @props --------------------------------------------------------------------------------------
 * - hideCompleted              => state value (boolean)
 * - setHideCompleted           => method to update the state value hideCompleted
 * ---------------------------------------------------------------------------------------------
 *
 */
export const FilterButton = ({ hideCompleted, setHideCompleted }) => (
  <div className="filter">
    <button className="filter__button" onClick={() => setHideCompleted(!hideCompleted)}>
      {hideCompleted ? 'Show All' : 'Hide Completed'}
    </button>
  </div>
);
