Meteor.startup(function () {
    if (process.env.NODE_ENV.match(/development|staging/)) {

        if (!Boards.find().count()) {

            /* Organize Meteor board */
            Boards.insert({
                '_id': '9TEcgO45TkVBizotA',
                'partup_id': 'vGaxNojSerdizDPjb',
                'created_at': new Date(),
                'updated_at': new Date(),
                'lanes': []
            });
            /* Incubator board */
            Boards.insert({
                '_id': 'Gzmun04TtYiP8llQ1',
                'partup_id': 'IGhBN2Z3mrA90j3g7',
                'created_at': new Date(),
                'updated_at': new Date(),
                'lanes': []
            });
            /* Partup developement board */
            Boards.insert({
                '_id': 'ABcmVsH93LfFJr83P',
                'partup_id': '1csyxDMvVcBjb8tFM',
                'created_at': new Date(),
                'updated_at': new Date(),
                'lanes': []
            });

            /* ING Crowd funding */
            Boards.insert({
                '_id': 'VItDJ3O3MpzeiPU5J',
                'partup_id': 'gJngF65ZWyS9f3NDE',
                'created_at': new Date(),
                'updated_at': new Date(),
                'lanes': []
            });

            /* ING Super Secret */
            Boards.insert({
                '_id': 'sGrp9AkRSDVwXNZnn',
                'partup_id': 'CJETReuE6uo2eF7eW',
                'created_at': new Date(),
                'updated_at': new Date(),
                'lanes': []
            });

            /* ING Super Secret */
            Boards.insert({
                '_id': 'jMU371tasWnf0RYUh',
                'partup_id': 'ASfRYBAzo2ayYk5si',
                'created_at': new Date(),
                'updated_at': new Date(),
                'lanes': []
            });
        }
    }
});
