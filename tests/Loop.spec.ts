import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Loop } from '../wrappers/Loop';
import '@ton/test-utils';

describe('Loop', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let loop: SandboxContract<Loop>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        loop = blockchain.openContract(await Loop.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await loop.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            },
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: loop.address,
            deploy: true,
            success: true,
        });
    });

    it('should repeat', async () => {
        await loop.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            'loop',
        );
        let result = await loop.getCount();
        console.log(result);
    });
    it('should while', async () => {
        await loop.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            'loopWhile',
        );
        let result = await loop.getCount();
        console.log(result);
    });
    it('should until', async () => {
        await loop.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            'doUntil',
        );
        let result = await loop.getCount();
        console.log(result);
    });
});
