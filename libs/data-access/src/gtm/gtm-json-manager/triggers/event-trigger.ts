import { TriggerConfig } from '../../../interfaces/gtm-config';
import { createTemplateParameter } from '../parameter-utils';

export function createTrigger(
  accountId: string,
  containerId: string,
  trigger: string
): TriggerConfig {
  return {
    accountId,
    containerId,
    type: 'CUSTOM_EVENT',
    name: `event equals ${trigger}`,
    customEventFilter: [
      {
        type: 'EQUALS',
        parameter: [
          createTemplateParameter('arg0', '{{_event}}'),
          createTemplateParameter('arg1', trigger),
        ],
      },
    ],
  };
}
