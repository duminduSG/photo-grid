import Grid from '../models/grid.model';

const saveGrid = async (req) => {
  const grid = new Grid({ grid: req.body });
  return grid.save();
};

export default saveGrid;
