import type NodeCG from '@nodecg/types';

module.exports = function (nodecg: NodeCG.ServerAPI) {
  const playerProfile = nodecg.Replicant('playerProfile', "Kirby's Quickstart", {
    defaultValue: {
      gamertag: 'RINON',
      team: '573',
      region: 'California',
      seed: 1,
      description: `- ROUND 1 ROYALE 2nd
			- TIMEZONE CHAMPIONSHIP 3rd
			- XANADU 1st`,
    },
    persistent: false,
  });
  nodecg.log.info('Successfully loaded player profile!');
};
