// https://www.linkedin.com/in/{username}/detail/recent-activity

/**
 * Halts execution for a certain amount of seconds.
 * https://stackoverflow.com/a/39914235
 */
function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

// Gets Comment dropdowns on comments you've authored.
function getDeleteCommentDropdowns() {
    const buttons = document.querySelectorAll(
        'button.artdeco-dropdown__trigger.artdeco-dropdown__trigger--placement-bottom.ember-view.artdeco-button.artdeco-button--1.artdeco-button--circle.artdeco-button--tertiary.artdeco-button--muted:not(.feed-shared-control-menu__trigger)'
    );
    // Filter buttons to ensure they are comment dropdowns (contain the specific SVG)
    return Array.from(buttons).filter(button => {
        const svg = button.querySelector('svg[data-test-icon="overflow-web-ios-small"]');
        return svg !== null;
    });
}

// Gets "Delete" button inside "Are you sure you want to delete your comment?" confirmation box.
function getDeleteConfirmationButton() {
    return document.querySelector("button.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view")
}

//
async function deleteComment() {
    await sleep(2);

    var deleteConfirmationButton = getDeleteConfirmationButton();
    if (deleteConfirmationButton) {
        deleteConfirmationButton.click();
    }
}

//
async function deleteActivity() {
    var deleteDropdowns = getDeleteCommentDropdowns();
    for (var i = 0; i < deleteDropdowns.length; i++) {
        deleteDropdowns[i].click()
        spans = document.querySelectorAll(".comment-options-dropdown__option-text span")
        for (const span of spans) {
            if (span.textContent.includes("Delete")) {
                span.click();
            }
        }
        deleteComment();
        await sleep(3);
    }
}

//
var keepGoing = true;
async function init() {
    console.log("*** Starting activity deletion ***");
    console.log(">>> Deleting comments")
    deleteActivity();
    if (keepGoing) {
        await sleep(5);
        init();
    }
}

init();
