import Grid from '../models/grid.model';

const saveGrid = async (req, res) => {
  try {
    const grid = await new Grid({ grid: req.body }).save();
    return res.json(grid);
  } catch (e) {
    return res.status(500).end();
  }
};

export default saveGrid;
