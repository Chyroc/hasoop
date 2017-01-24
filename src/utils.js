/**
 * Created by Chyroc on 17/1/15.
 */
import _ from 'lodash'

function splitTopConfig (config) {
  return _.omitBy(config, _.isObject)
}

function splitInputsConfig (configs) {
  const inputConfig = {}
  _.map(configs, (config) => {
    _.map(config.inputs, (input) => {
      const nameSplit = input.name.split('.')
      _.set(inputConfig, nameSplit[1], input.value || null)
    })
  })
  return inputConfig
}

export function splitLinkConfig (linkInfo) {
  const topConfig = splitTopConfig(_.get(linkInfo, 'links[0]'))
  const otherConfig = splitInputsConfig(_.get(linkInfo, 'links[0].link-config-values.configs'))
  const linkConfig = {}
  _.map({
    ...topConfig,
    ...otherConfig
  }, (value, key) => _.set(linkConfig, _.camelCase(key), _.isString(value) ? decodeURIComponent(value) : value))
  return linkConfig
}

export function splitJobConfig (jobInfo) {
  const topConfig = splitTopConfig(_.get(jobInfo, 'jobs[0]'))
  const fromLinkConfig = splitInputsConfig(_.get(jobInfo, 'jobs[0].from-config-values.configs'))
  const toLinkConfig = splitInputsConfig(_.get(jobInfo, 'jobs[0].to-config-values.configs'))
  const driverConfig = splitInputsConfig(_.get(jobInfo, 'jobs[0].driver-config-values.configs'))
  const jobConfig = {}
  _.map({
    ..._.mapKeys(topConfig, (value, key) => `top_${key}`),
    ..._.mapKeys(driverConfig, (value, key) => `driver_${key}`),
    ..._.mapKeys(fromLinkConfig, (value, key) => `from_${key}`),
    ..._.mapKeys(toLinkConfig, (value, key) => `to_${key}`)
  }, (value, key) => _.set(jobConfig, _.camelCase(key), _.isString(value) ? decodeURIComponent(value) : value))
  return jobConfig
}