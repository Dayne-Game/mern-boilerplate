const mongoose = require('mongoose');
const DayTimelog = mongoose.model('DayTimelog');

const updateTimelog = async (req, res) => {
    try {
        const dayTimelogId = req.params.dayId;
        const timelogId = req.params.timelogId;
        const updates = req.body;
        const dayTimelog = await DayTimelog.findById(dayTimelogId);
        if (!dayTimelog) {
            return res.status(404).send({ error: 'Day timelog not found' });
        }
        const timelog = dayTimelog.timelogs.id(timelogId);
        if (!timelog) {
            return res.status(404).send({ error: 'Timelog not found' });
        }
        Object.assign(timelog, updates);
        await dayTimelog.save();
        return res.status(200).send({ dayTimelog });
    } catch (error) {
        return res.status(500).send({ error });
    }
};

router.put("/daytimelog/:dayId/timelog/:timelogId", updateTimelog);