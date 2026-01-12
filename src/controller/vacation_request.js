import dayjs from 'dayjs';
import validate from './validation/validate.js';

class VacationRequest {
    constructor() {
        this.STATUS = {
            NEW: 1,
            APPROVED: 2,
            REJECTED: 3,
        };
    }

    init() {
        app.post(
            '/api/send-vacation-request',
            [
                validator.body('start_date').isDate({ format: 'YYYY-MM-DD', strictMode: true }),
                validator.body('end_date').isDate({ format: 'YYYY-MM-DD', strictMode: true }),
                validator.body('reason').isString(),
                validator.body('user_id').isInt(),
            ],
            validate,
            (request, response) => {
                const data = request.validated;
                knex('vacation_requests')
                    .insert({
                        start_date: dayjs(data.start_date).format('YYYY-MM-DD'),
                        end_date: dayjs(data.end_date).format('YYYY-MM-DD'),
                        reason: data.reason,
                        user_id: data.user_id,
                        status: 1,
                    })
                    .then(() => response.send('OK'));
            },
        );

        app.post(
            '/api/handle-vacation-request/:id',
            [
                validator.param('id').isInt(),
                validator.body('status').isIn(Object.values(this.STATUS)),
                validator.body('comment').optional().isString(),
            ],
            validate,
            (request, response) => {
                const data = request.validated;
                const updateData = {
                    status: data.status,
                };
                if (data.comment) {
                    updateData.comment = data.comment;
                }
                knex('vacation_requests')
                    .where({ id: data.id })
                    .update(updateData)
                    .then(() => response.send('OK'));
            },
        );

        app.get(
            '/api/get-vacations/:userId',
            [
                validator.param('userId').optional().isInt(),
                validator.query('sortDirection').optional().isIn(['asc', 'desc']),
                validator.query('sortParam').optional().isIn(['status']),
            ],
            validate,
            (request, response) => {
                const { userId, sortParam, sortDirection } = request.validated;

                const queryBuilder = knex('vacation_requests').select('*');

                //validated userId
                if (userId) {
                    queryBuilder.where({
                        user_id: userId,
                    });
                }

                if (sortParam && sortDirection) {
                    queryBuilder.orderBy(sortParam, sortDirection);
                }

                queryBuilder.then((data) => {
                    response.send(data);
                });
            },
        );
    }
}

export default VacationRequest;
