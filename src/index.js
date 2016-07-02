import axios from 'axios'
import path from 'path'
import qs from 'querystring'

export default class SemaphoreAPI {
  constructor({api_url = 'http://semaphoreci.com/api/v1', api_hash, auth_token}){
    this.api_url = api_url;
    this.api_hash = api_hash;
    this.auth_token = auth_token;
  }

  _buildRequest(request_string, url_params = {}) {
    let url_param_string = qs.stringify(Object.assign({auth_token: this.auth_token}, url_params));
    let request_path = path.join('/', request_string);

    return `${this.api_url}${request_path}?${url_param_string}`;
  }

  /* 
    Branches & Builds 
    https://semaphoreci.com/docs/branches-and-builds-api.html
  */
  getBranches() {
    return axios.get(this._buildRequest(`/projects/${this.api_hash}/branches`));
  }

  getBranchStatus({branch_id, branch_name}) {
    let branch_selector = branch_id || branch_name;

    return axios.get(this._buildRequest(`/projects/${this.api_hash}/${branch_selector}/status`));
  }

  getBranchHistory({branch_id, branch_name, page = 1}) {
    let branch_selector = branch_id || branch_name;

    return axios.get(this._buildRequest(`/projects/${this.api_hash}/${branch_selector}`, {page: page}));
  }

  getBuildInfo({branch_id, branch_name, build_number}) {
    let branch_selector = branch_id || branch_name;

    return axios.get(this._buildRequest(`/projects/${this.api_hash}/${branch_selector}/builds/${build_number}`));
  }

  getBuildLog({branch_id, branch_name, build_number}) {
    let branch_selector = branch_id || branch_name;

    return axios.get(this._buildRequest(`/projects/${this.api_hash}/${branch_selector}/builds/${build_number}/log`));
  }

  rebuildLastRevision({branch_id, branch_name}) {
    let branch_selector = branch_id || branch_name;

    return axios.post(this._buildRequest(`/projects/${this.api_hash}/${branch_selector}/build`));
  }

  launchBuild(branch_info) {
    return rebuildLastRevision(branch_info);
  }

  stopBuild({branch_id, branch_name, build_number}) {
    let branch_selector = branch_id || branch_name;

    return axios.post(this._buildRequest(`/projects/${this.api_hash}/${branch_selector}/builds/${build_number}/stop`));
  }

  runDeployFromBuild({branch_id, branch_name, build_number, server_id}) {
    return axios.post(this._buildRequest(`/projects/${this.api_hash}/${branch_selector}/builds/${build_number}/deploy/${server_id}`));
  }

  /* 
    Servers & Deploys
    https://semaphoreci.com/docs/servers-and-deploys-api.html
  */
  getServers() {
    return axios.get(this._buildRequest(`/projects/${this.api_hash}/servers`));
  }

  getServerStatus({server_id}) {
    return axios.get(this._buildRequest(`/projects/${this.api_hash}/servers/${server_id}/status`));
  }

  getServerHistory({server_id}) {
    return axios.get(this._buildRequest(`/projects/${this.api_hash}/servers/${server_id}`));
  }

  getDeployInformation({server_id, deploy_number}) {
    return axios.get(this._buildRequest(`/projects/${this.api_hash}/servers/${server_id}/deploys/${deploy_number}`));
  }

  getDeployLog({server_id, deploy_number}) {
    return axios.get(this._buildRequest(`/projects/${this.api_hash}/servers/${server_id}/deploys/${deploy_number}/log`));
  }

  stopDeploy({server_id, deploy_number}) {
    return axios.get(this._buildRequest(`/projects/${this.api_hash}/servers/${server_id}/deploys/${deploy_number}/stop`));
  }

  /* 
    Webhooks
    https://semaphoreci.com/docs/webhooks-api.html
  */
  getWebhooks() {
    return axios.get(this._buildRequest(`/projects/${this.api_hash}/hooks`));
  }

  createWebhook({url, hook_type}) {
    return axios.post(this._buildRequest(`/projects/${this.api_hash}/hooks`), {url, hook_type});
  }

  updateWebhook({webhook_id, url, hook_type}) {
    return axios.put(this._buildRequest(`/projects/${this.api_hash}/hooks/${webhook_id}`), {url, hook_type});
  }

  deleteWebhook({webhook_id}) {
    return axios.delete(this._buildRequest(`/projects/${this.api_hash}/hooks/${webhook_id}`));
  }
}
