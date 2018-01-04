module.exports = {
  label: "Repository Details",
  description: "Get repo details",
  mock_input: { Username: 'kailashyogeshwar85' },
  input: {
    type: 'object',
    title: 'Get Repo Details',
    properties: {
      UserName: {
        "title": "User Name",
        "type": "string",
        "minLength": 1,
        "propertyOrder": 2
      },
      RepoName: {
        "title": "Respositories Name",
        "type": "string",
        "minLength": 1,
        "propertyOrder": 3,
        "lookup": {
          "id": "repo_list",
          "dependencies": [
            "UserName"
          ]
        }
      }
    }
  },
  output: {
    "type": "object",
    "title": "output",
    "displayTitle": "Output",
    "properties": {
      "archive_url": {
        "type": "string",
        "title": "archive_url",
        "displayTitle": "Archive URL"
      },
      "assignees_url": {
        "type": "string",
        "title": "assignees_url",
        "displayTitle": "Assignees URL"
      },
      "blobs_url": {
        "type": "string",
        "title": "blobs_url",
        "displayTitle": "Blobs URL"
      },
      "branches_url": {
        "type": "string",
        "title": "branches_url",
        "displayTitle": "Branches URL"
      },
      "clone_url": {
        "type": "string",
        "title": "clone_url",
        "displayTitle": "Clone URL"
      },
      "collaborators_url": {
        "type": "string",
        "title": "collaborators_url",
        "displayTitle": "Collaborators URL"
      },
      "comments_url": {
        "type": "string",
        "title": "comments_url",
        "displayTitle": "Comments URL"
      },
      "commits_url": {
        "type": "string",
        "title": "commits_url",
        "displayTitle": "Commits URL"
      },
      "compare_url": {
        "type": "string",
        "title": "compare_url",
        "displayTitle": "Compare URL"
      },
      "contents_url": {
        "type": "string",
        "title": "contents_url",
        "displayTitle": "Contents URL"
      },
      "contributors_url": {
        "type": "string",
        "title": "contributors_url",
        "displayTitle": "Contributors URL"
      },
      "created_at": {
        "type": "string",
        "title": "created_at",
        "displayTitle": "Created At"
      },
      "default_branch": {
        "type": "string",
        "title": "default_branch",
        "displayTitle": "Default Branch"
      },
      "description": {
        "type": "string",
        "title": "description",
        "displayTitle": "Description"
      },
      "downloads_url": {
        "type": "string",
        "title": "downloads_url",
        "displayTitle": "Downloads URL"
      },
      "events_url": {
        "type": "string",
        "title": "events_url",
        "displayTitle": "Events URL"
      },
      "fork": {
        "type": "boolean",
        "title": "fork",
        "displayTitle": "Fork"
      },
      "forks": {
        "type": "string",
        "title": "forks",
        "displayTitle": "Forks"
      },
      "forks_count": {
        "type": "string",
        "title": "forks_count",
        "displayTitle": "Forks Count"
      },
      "forks_url": {
        "type": "string",
        "title": "forks_url",
        "displayTitle": "Forks URL"
      },
      "full_name": {
        "type": "string",
        "title": "full_name",
        "displayTitle": "Full Name"
      },
      "git_commits_url": {
        "type": "string",
        "title": "git_commits_url",
        "displayTitle": "Git Commits URL"
      },
      "git_refs_url": {
        "type": "string",
        "title": "git_refs_url",
        "displayTitle": "Git Refs URL"
      },
      "git_tags_url": {
        "type": "string",
        "title": "git_tags_url",
        "displayTitle": "Git Tags URL"
      },
      "git_url": {
        "type": "string",
        "title": "git_url",
        "displayTitle": "Git URL"
      },
      "has_downloads": {
        "type": "boolean",
        "title": "has_downloads",
        "displayTitle": "Has Downloads"
      },
      "has_issues": {
        "type": "boolean",
        "title": "has_issues",
        "displayTitle": "Has Issues"
      },
      "has_pages": {
        "type": "boolean",
        "title": "has_pages",
        "displayTitle": "Has Pages"
      },
      "has_wiki": {
        "type": "boolean",
        "title": "has_wiki",
        "displayTitle": "Has Wiki"
      },
      "homepage": {
        "type": "object",
        "title": "homepage",
        "displayTitle": "Homepage"
      },
      "hooks_url": {
        "type": "string",
        "title": "hooks_url",
        "displayTitle": "Hooks URL"
      },
      "html_url": {
        "type": "string",
        "title": "html_url",
        "displayTitle": "Html URL"
      },
      "id": {
        "type": "string",
        "title": "id",
        "displayTitle": "ID"
      },
      "issue_comment_url": {
        "type": "string",
        "title": "issue_comment_url",
        "displayTitle": "Issue Comment URL"
      },
      "issue_events_url": {
        "type": "string",
        "title": "issue_events_url",
        "displayTitle": "Issue Events URL"
      },
      "keys_url": {
        "type": "string",
        "title": "keys_url",
        "displayTitle": "Keys URL"
      },
      "labels_url": {
        "type": "string",
        "title": "labels_url",
        "displayTitle": "Labels URL"
      },
      "language": {
        "type": "object",
        "title": "language",
        "displayTitle": "Language"
      },
      "languages_url": {
        "type": "string",
        "title": "languages_url",
        "displayTitle": "Languages URL"
      },
      "merges_url": {
        "type": "string",
        "title": "merges_url",
        "displayTitle": "Merges URL"
      },
      "milestones_url": {
        "type": "string",
        "title": "milestones_url",
        "displayTitle": "Milestones URL"
      },
      "mirror_url": {
        "type": "object",
        "title": "mirror_url",
        "displayTitle": "Mirror URL"
      },
      "name": {
        "type": "string",
        "title": "name",
        "displayTitle": "Name"
      },
      "notifications_url": {
        "type": "string",
        "title": "notifications_url",
        "displayTitle": "Notifications URL"
      },
      "open_issues": {
        "type": "string",
        "title": "open_issues",
        "displayTitle": "Open Issues"
      },
      "open_issues_count": {
        "type": "string",
        "title": "open_issues_count",
        "displayTitle": "Open Issues Count"
      },
      "owner": {
        "type": "object",
        "title": "owner",
        "displayTitle": "Owner"
      },
      "permissions": {
        "type": "object",
        "title": "permissions",
        "displayTitle": "Permissions"
      },
      "private": {
        "type": "boolean",
        "title": "private",
        "displayTitle": "Private"
      },
      "pulls_url": {
        "type": "string",
        "title": "pulls_url",
        "displayTitle": "Pulls URL"
      },
      "pushed_at": {
        "type": "string",
        "title": "pushed_at",
        "displayTitle": "Pushed At"
      },
      "releases_url": {
        "type": "string",
        "title": "releases_url",
        "displayTitle": "Releases URL"
      },
      "size": {
        "type": "string",
        "title": "size",
        "displayTitle": "Size"
      },
      "ssh_url": {
        "type": "string",
        "title": "ssh_url",
        "displayTitle": "Ssh URL"
      },
      "stargazers_count": {
        "type": "string",
        "title": "stargazers_count",
        "displayTitle": "Stargazers Count"
      },
      "stargazers_url": {
        "type": "string",
        "title": "stargazers_url",
        "displayTitle": "Stargazers URL"
      },
      "statuses_url": {
        "type": "string",
        "title": "statuses_url",
        "displayTitle": "Statuses URL"
      },
      "subscribers_url": {
        "type": "string",
        "title": "subscribers_url",
        "displayTitle": "Subscribers URL"
      },
      "subscription_url": {
        "type": "string",
        "title": "subscription_url",
        "displayTitle": "Subscription URL"
      },
      "svn_url": {
        "type": "string",
        "title": "svn_url",
        "displayTitle": "Svn URL"
      },
      "tags_url": {
        "type": "string",
        "title": "tags_url",
        "displayTitle": "Tags URL"
      },
      "teams_url": {
        "type": "string",
        "title": "teams_url",
        "displayTitle": "Teams URL"
      },
      "trees_url": {
        "type": "string",
        "title": "trees_url",
        "displayTitle": "Trees URL"
      },
      "updated_at": {
        "type": "string",
        "title": "updated_at",
        "displayTitle": "Updated At"
      },
      "url": {
        "type": "string",
        "title": "url",
        "displayTitle": "URL"
      },
      "watchers": {
        "type": "object",
        "title": "watchers",
        "displayTitle": "Watchers"
      },
      "watchers_count": {
        "type": "object",
        "title": "watchers_count",
        "displayTitle": "Watchers Count"
      }
    }
  },
  execute: function(input, output){
    var request = require('request');

    request({
      url: 'https://api.github.com/users/' + input.auth.username + '/repos',
      headers: {
        "Authorization": "Basic " + new buffer(input.auth.username + ":" + input.auth.password).toString('base64'),
        "User-Agent": input.auth.username
      },
      method: 'GET'
    },
    function(err, resp, body){
        if (err){
          return output(err, null);
        }
        if (resp.statusCode != 200){
          return output(body);
        }
        output(null, { repo : JSON.parse(body) });
    })
  }
}
