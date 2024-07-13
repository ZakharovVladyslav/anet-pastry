'use client';

import { UUID } from 'crypto';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useEffect, useState } from 'react';
import { HexAlphaColorPicker } from 'react-colorful';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Input, Modal } from '@/components';
import { RootState, updateCreationCard } from '@/store';
import { hexToRgb, hexToRgba, hexToHsv, rgbToHex, acceptDigitsOnly } from '@/utils';

import { ColorItem } from './color-item';

import s from './color.module.scss';
import './picker.scss';

type TProps = {
   paramId: UUID;
};

export const ColorParameterModal = ({
   isOpened,
   onClose,
   paramId,
}: TModalProps & TProps) => {
   const dispatch = useDispatch();

   const t = useTranslations();

   const { creationCard } = useSelector((state: RootState) => state.creationCard);

   const [colorParams, setColorParams] = useState<TColorParams>({
      hex: '#ffffff',
      rgb: hexToRgb('#ffffff') as TRgb,
      rgba: hexToRgba('#ffffff') as TRgba,
      hsv: hexToHsv('#ffffff') as THsv,
   });
   const [colors, setColors] = useState<string[]>([]);

   useEffect(() => {
      if (!isOpened) return;

      const parameter = creationCard.parameters.find(
         param => param.id === paramId,
      ) as TProductParameter<TColorParameter>;

      if (!parameter) return;

      setColors(parameter?.additionalInfo?.colors ?? []);
   }, [isOpened]);

   const handleChangeColor = (newColor: string) => {
      setColorParams({
         hex: newColor,
         rgb: hexToRgb(newColor) as TRgb,
         rgba: hexToRgba(newColor) as TRgba,
         hsv: hexToHsv(newColor) as THsv,
      });
   };

   const handleInputHex = (e: ChangeEvent<HTMLInputElement>) => {
      const newColor = e.target.value;
      setColorParams({
         hex: newColor,
         rgb: hexToRgb(newColor) as TRgb,
         rgba: hexToRgba(newColor) as TRgba,
         hsv: hexToHsv(newColor) as THsv,
      });
   };
   const handleInputRGB = (e: ChangeEvent<HTMLInputElement>, rgbCode: keyof TRgb) => {
      let value = acceptDigitsOnly(e.target.value);

      if (value.length > 3 || +value > 255) {
         value = '255';
      }

      const inputRgb = { ...colorParams.rgb, [rgbCode]: +value } as TRgb;
      const hex = rgbToHex(inputRgb.r, inputRgb.g, inputRgb.b);

      setColorParams({
         hex,
         rgb: inputRgb,
         rgba: hexToRgba(hex) as TRgba,
         hsv: hexToHsv(hex) as THsv,
      });
   };

   const handleAddColor = () => {
      if (!colors.includes(colorParams.hex)) {
         setColors([...colors, colorParams.hex]);
      }
   };

   const handleRemoveColor = (color: string) => {
      const colorIndex = colors.findIndex(targetColor => targetColor === color);

      if (colorIndex === -1) return;

      const updatedColors = [...colors];

      updatedColors.splice(colorIndex, 1);

      setColors(updatedColors);
   };

   const handleSave = () => {
      const targetIndex = creationCard.parameters.findIndex(
         param => param.id === paramId,
      );

      const updatedParameters = [...creationCard.parameters];

      updatedParameters[targetIndex] = {
         ...updatedParameters[targetIndex],
         additionalInfo: {
            colors,
         },
      } as TProductParameter<TColorParameter>;

      dispatch(updateCreationCard({ parameters: updatedParameters }));

      onClose();
   };

   return (
      <Modal isOpened={isOpened} onClose={onClose}>
         <section className={s.wrapper}>
            <section className={s.headline}>
               <HexAlphaColorPicker
                  color={colorParams.hex}
                  onChange={handleChangeColor}
               />

               <div className={s.colorFields}>
                  <div className={s.inputs}>
                     <Input
                        label={'HEX'}
                        placeholder="#hex"
                        value={colorParams.hex}
                        onChange={handleInputHex}
                     />

                     <div className={s.tripleColors}>
                        <Input
                           placeholder="R"
                           label="R"
                           value={colorParams.rgb?.r.toString()}
                           onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleInputRGB(e, 'r')
                           }
                        />
                        <Input
                           placeholder="G"
                           label="G"
                           value={colorParams.rgb?.g.toString()}
                           onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleInputRGB(e, 'g')
                           }
                        />
                        <Input
                           placeholder="B"
                           label="B"
                           value={colorParams.rgb?.b.toString()}
                           onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleInputRGB(e, 'b')
                           }
                        />
                     </div>
                  </div>

                  <div
                     className={s.preview}
                     style={{ backgroundColor: colorParams.hex }}
                  />

                  <Button onClick={handleAddColor} width="full" size="m">
                     {t('Modal.ColorPicker.addColor')}
                  </Button>
               </div>
            </section>

            <div className={s.chosenColorsWrapper}>
               <h1 className={s.title}>{t('Modal.ColorPicker.ChosenColors.title')}</h1>

               <div className={s.chosenColors}>
                  {colors.length > 0 ? (
                     colors.map(color => (
                        <ColorItem
                           key={color}
                           color={color}
                           removeColor={handleRemoveColor}
                        />
                     ))
                  ) : (
                     <p className={s.noColors}>
                        {t('Modal.ColorPicker.ChosenColors.noColors')}
                     </p>
                  )}
               </div>
            </div>

            <div className={s.buttons}>
               <Button onClick={onClose} variant="secondary" width="full">
                  {t('Modal.ColorPicker.Buttons.cancel')}
               </Button>
               <Button
                  onClick={handleSave}
                  variant="primary"
                  width="full"
                  disabled={colors.length === 0}
               >
                  {t('Modal.ColorPicker.Buttons.save')}
               </Button>
            </div>
         </section>
      </Modal>
   );
};
