import * as cp from 'child_process';

export function nslookup(host: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const command = `nslookup ${host}`;
    
    cp.exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      
      const matched = stdout.match(/\d+\.\d+\.\d+\.\d+/);
      resolve((matched.length > 0) ? matched[0] : null);
    });
  });
}
