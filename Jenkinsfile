pipeline{
    agent any
    stages{
        stage("DataScientest Variables"){
            steps{
                echo "Hello baby1"
                sh "printenv"
                echo "The build id is ${env.BUILD_ID}"
            }

        }

        stage("Invoking another pipeline"){
            steps{
                build job: 'WEBIGEO',parameters:[string(name:'param1',value:"value1")],wait: true
            }
        }

        stage("End"){
            steps{
                echo "Bye"
            }
        }
    }
}