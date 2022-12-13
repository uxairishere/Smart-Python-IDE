import React from 'react'

export function SuccessAccuracy(success, error){
        var total_commits = success + error;
        var successacc = (success / total_commits) * 100;
        return parseInt(successacc)
}

export function ErrorAccuracy (success, error) {
    var total_commits = success + error;
    var erroracc = (error / total_commits) * 100;
    return parseInt(erroracc)
}