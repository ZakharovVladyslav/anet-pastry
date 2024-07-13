import { UUID } from 'crypto';
import { FC } from 'react';

import { ColorParameter } from '@/components/ui/modal/products/parts/parameters/parameter/parts/color';
import { EParameterType } from '@/enums';

type TParameterProps = {
   paramId: UUID;
};

export const parameterComponents: Record<EParameterType, FC<TParameterProps>> = {
   [EParameterType.COLOR]: ColorParameter,
   [EParameterType.INPUT]: ColorParameter,
   [EParameterType.COUNTER]: ColorParameter,
   [EParameterType.TOGGLE]: ColorParameter,
};
