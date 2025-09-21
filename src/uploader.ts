import { IgApiClient, IgCheckpointError } from "instagram-private-api";
import inquirer from "inquirer";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export const uploadReel = async (path: string) => {
  const IG_USERNAME = process.env.IG_USERNAME || '';
  const IG_PASSWORD = process.env.IG_PASSWORD || '';

  const ig = new IgApiClient();
  ig.state.generateDevice(IG_USERNAME);

  await ig.simulate.preLoginFlow();
  await ig.challenge.auto(true);
  const loggedInUser = ig.account.login(IG_USERNAME, IG_PASSWORD).catch(async (err) => {
    const { username, totp_two_factor_on, two_factor_identifier } = err.response.body.two_factor_info;
    // decide which method to use
    console.log({ username, totp_two_factor_on, two_factor_identifier })
    const verificationMethod = totp_two_factor_on ? '0' : '1'; // default to 1 for SMS
    // At this point a code should have been sent
    // Get the code
    const { code } = await inquirer.prompt([
      {
        type: 'input',
        name: 'code',
        message: `Enter code received via ${verificationMethod === '1' ? 'SMS' : 'TOTP'}`,
      },
    ]);
    // Use the code to finish the login process
    return ig.account.twoFactorLogin({
      username,
      verificationCode: code,
      twoFactorIdentifier: two_factor_identifier,
      verificationMethod, // '1' = SMS (default), '0' = TOTP (google auth for example)
      trustThisDevice: '1', // Can be omitted as '1' is used by default
    });
  });
};
