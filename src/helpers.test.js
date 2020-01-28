import { expect } from 'chai';
import {bombNum,shuffle} from '../src/helpers';

describe('shuffle', () => {
  test.only('shuffle returns an array', () => {
    expect(shuffle([2,4,67,3])).to.be.an('array');
  })
  test('shuffle returns another order', () => {
    expect(shuffle([2,4,67,3])).to.not.deep.equal([2,4,67,3]);
  })
});