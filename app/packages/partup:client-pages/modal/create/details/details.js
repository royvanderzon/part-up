var FORM_ID = 'createPartupForm';

Template.modal_create_details.onCreated(function() {
    this.submitting = new ReactiveVar(false);
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.modal_create_details.helpers({
    currentPartup: function() {
        var partupId = Session.get('partials.create-partup.current-partup');
        var partup = Partups.findOne({_id: partupId});
        if (!partup) return;

        return partup;
    },
    submittingSkip: function() {
        return Template.instance().submitting.get() === 'skip';
    },
    submittingNext: function() {
        return Template.instance().submitting.get() === 'next';
    },
    submitting: function() {
        return !!Template.instance().submitting.get();
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.modal_create_details.events({
    'click [data-submission-type]': function eventClickSetSubmissionType (event, template) {
        var button = event.currentTarget;
        var submissionType = button.getAttribute('data-submission-type');
        Session.set('partials.create-partup.submission-type', submissionType);

        if (button.type !== 'submit') {
            var form = template.find('#' + FORM_ID);
            $(form).submit();
        }
    }
});

/*************************************************************/
/* Widget create partup */
/*************************************************************/
var createOrUpdatePartup = function createOrUpdatePartup (partupId, insertDoc, callback) {
    if (partupId) {

        // Partup already exists. Update.
        Meteor.call('partups.update', partupId, insertDoc, function(error, res) {
            if (error && error.reason) {
                Partup.client.notify.error(error.reason);
                AutoForm.validateForm(self.formId);
                self.done(new Error(error.message));
                return;
            }

            callback(partupId);
        });

    } else {

        // Partup does not exists yet. Insert.
        Meteor.call('partups.insert', insertDoc, function(error, res) {
            if (error && error.reason) {
                Partup.client.notify.error(error.reason);
                AutoForm.validateForm(self.formId);
                self.done(new Error(error.message));
                return;
            }

            Session.set('partials.create-partup.current-partup', res._id);
            callback(res._id);
        });

    }
};

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
var afHooks = {};
afHooks[FORM_ID] = {
    onSubmit: function(insertDoc) {
        var self = this;
        var partupId = Session.get('partials.create-partup.current-partup');
        var submissionType = Session.get('partials.create-partup.submission-type') || 'next';

        var template = self.template.parent().parent();
        template.submitting.set(submissionType);

        createOrUpdatePartup(partupId, insertDoc, function(id) {

            if (submissionType === 'next') {
                Router.go('create-activities', {_id: id});
            } else if (submissionType === 'skip') {
                Partup.client.intent.return('create', [id], function(id) {
                    Router.go('partup', {_id: id});
                });
            }
        });

        this.event.preventDefault();
        return false;
    }
};
AutoForm.hooks(afHooks);
